import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash"; // Google renames/retires models often — check ai.google.dev/gemini-api/docs/models if this ever 404s

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const systemPrompt = context
      ? `You are EduMate's AI study assistant. Be concise and encouraging. Here's the student's current context:\n${context}`
      : "You are EduMate's AI study assistant. Be concise and encouraging.";

    // Gemini calls the AI's turns "model", not "assistant"
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", errText);
      return res.status(502).json({ error: "AI service error" });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") || "";

    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend running on http://localhost:${PORT}`);
});