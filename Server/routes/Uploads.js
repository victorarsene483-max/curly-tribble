import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
const METADATA_FILE = path.join(UPLOAD_DIR, "metadata.json");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function loadMetadata() {
  try {
    if (!fs.existsSync(METADATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(METADATA_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveMetadata(data) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(data, null, 2));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB cap
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Unsupported file type"));
  },
});

router.get("/", (req, res) => {
  const { unitCode } = req.query;
  let docs = loadMetadata();
  if (unitCode) docs = docs.filter((d) => d.unitCode === unitCode);
  res.json(docs);
});

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { unitCode = "", category = "notes" } = req.body;
  const docs = loadMetadata();

  const newDoc = {
    id: req.file.filename,
    originalName: req.file.originalname,
    unitCode,
    category,
    size: req.file.size,
    uploadedAt: new Date().toISOString(),
    url: `/uploads/${req.file.filename}`,
  };

  docs.push(newDoc);
  saveMetadata(docs);
  res.status(201).json(newDoc);
});

router.delete("/:id", (req, res) => {
  const docs = loadMetadata();
  const doc = docs.find((d) => d.id === req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });

  fs.unlink(path.join(UPLOAD_DIR, doc.id), () => {});
  saveMetadata(docs.filter((d) => d.id !== req.params.id));
  res.status(204).end();
});

export default router;