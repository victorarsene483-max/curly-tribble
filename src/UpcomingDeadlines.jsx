import { useMemo } from "react";
import { useDashboard } from "./DashboardContext";
import "./UpcomingDeadlines.css"
function getUrgencyTheme(daysLeft) {
  if (daysLeft <= 3) return "red";
  if (daysLeft <= 5) return "orange";
  if (daysLeft <= 7) return "green";
  return "blue";
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function UpcomingDeadlines() {
  const { assignments, units } = useDashboard();

  const upcoming = useMemo(() => {
    return assignments
      .filter((a) => !a.completed)
      .map((a) => ({ ...a, daysLeft: getDaysUntil(a.dueDate) }))
      .filter((a) => a.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [assignments]);

  return (
    <div className="deadlines-card">
      <div className="deadlines-header">
        <h3>Upcoming Deadlines</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>

      {upcoming.length === 0 ? (
        <p className="deadlines-empty">No upcoming deadlines — you're all caught up.</p>
      ) : (
        <ul className="deadlines-list">
          {upcoming.map((item) => {
            const theme = getUrgencyTheme(item.daysLeft);
            const unit = units.find((u) => u.code === item.unitCode);
            return (
              <li className="deadline-row" key={item.id}>
                <span className={`deadline-dot theme-${theme}`} />
                <div className="deadline-info">
                  <p className="deadline-title">{item.title}</p>
                  <p className="deadline-unit">
                    {item.unitCode}
                    {unit ? ` – ${unit.name}` : ""}
                  </p>
                </div>
                <div className="deadline-meta">
                  <span className={`deadline-days theme-${theme}`}>
                    {item.daysLeft === 0
                      ? "Due today"
                      : `${item.daysLeft} day${item.daysLeft === 1 ? "" : "s"} left`}
                  </span>
                  <span className="deadline-date">{formatDate(item.dueDate)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default UpcomingDeadlines;