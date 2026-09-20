import { Box, Database, Code2, BarChart3, Binary, Wifi, MessageSquare, Atom } from "lucide-react";

// Maps the icon "key" string stored on each unit (see THEME_CYCLE in DashboardContext)
// to an actual lucide-react component.
export const UNIT_ICONS = {
  box: Box,
  database: Database,
  code: Code2,
  chart: BarChart3,
  binary: Binary,
  wifi: Wifi,
  message: MessageSquare,
  atom: Atom,
};

// Returns the number of whole days between today and dueDate (can be negative if overdue).
// Both dates are compared at midnight so "today" always reads as 0, regardless of current time.
export function getDaysUntil(dueDate) {
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}