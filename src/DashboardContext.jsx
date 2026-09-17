import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "edumate_units";

const THEME_CYCLE = [
  { icon: "box", color: "purple" },
  { icon: "database", color: "green" },
  { icon: "code", color: "orange" },
  { icon: "chart", color: "blue" },
  { icon: "binary", color: "pink" },
  { icon: "wifi", color: "teal" },
  { icon: "message", color: "red" },
  { icon: "atom", color: "indigo" },
];

// Seed data — only used the very first time the app runs (nothing in localStorage yet).
const DEFAULT_UNITS = [
  { code: "COSC 312", name: "Components & Design Techniques for Digital Systems" },
  { code: "COSC 325", name: "Data Structures" },
  { code: "COSC 326", name: "Web Design Development and Administration" },
  { code: "COSC 332", name: "Software Engineering" },
  { code: "COSC 340", name: "Theory of Computation" },
  { code: "COSC 361", name: "Computer Networks I" },
  { code: "COSC 380", name: "Research Methods in Computer Science" },
].map((unit, index) => ({
  id: `unit-seed-${index}`,
  lecturer: "",
  semester: "Semester 1, 2026",
  progress: 0,
  assignmentsCount: 0,
  icon: THEME_CYCLE[index % THEME_CYCLE.length].icon,
  color: THEME_CYCLE[index % THEME_CYCLE.length].color,
  ...unit,
}));

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `unit-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// Basic shape-check so a corrupted/edited localStorage value can't crash the app.
function isValidUnitArray(data) {
  return (
    Array.isArray(data) &&
    data.every((u) => u && typeof u === "object" && typeof u.id === "string" && typeof u.code === "string")
  );
}

function loadUnits(initialUnits) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialUnits.length > 0 ? initialUnits : DEFAULT_UNITS;

    const parsed = JSON.parse(raw);
    if (!isValidUnitArray(parsed)) {
      console.warn("Saved units were malformed — resetting to defaults.");
      return initialUnits.length > 0 ? initialUnits : DEFAULT_UNITS;
    }
    return parsed;
  } catch (err) {
    console.warn("Could not read units from localStorage — resetting to defaults.", err);
    return initialUnits.length > 0 ? initialUnits : DEFAULT_UNITS;
  }
}

const DashboardContext = createContext(null);

export function DashboardProvider({ children, initialUnits = [], initialAssignments = [] }) {
  const [units, setUnits] = useState(() => loadUnits(initialUnits));
  const [assignments, setAssignments] = useState(initialAssignments);

  // Persist to localStorage every time units change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(units));
    } catch (err) {
      console.error("Failed to save units to localStorage.", err);
    }
  }, [units]);

  function addUnit({ code, name, lecturer = "", semester = "" }) {
    const theme = THEME_CYCLE[units.length % THEME_CYCLE.length];
    const newUnit = {
      id: generateId(),
      code,
      name,
      lecturer,
      semester,
      progress: 0,
      assignmentsCount: 0,
      icon: theme.icon,
      color: theme.color,
    };
    setUnits((prev) => [...prev, newUnit]);
  }

  function updateUnit(id, updates) {
    setUnits((prev) =>
      prev.map((unit) => (unit.id === id ? { ...unit, ...updates } : unit))
    );
  }

  function deleteUnit(id) {
    setUnits((prev) => prev.filter((unit) => unit.id !== id));
  }

  return (
    <DashboardContext.Provider
      value={{ units, assignments, addUnit, updateUnit, deleteUnit, setUnits, setAssignments }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside a DashboardProvider");
  }
  return ctx;
}