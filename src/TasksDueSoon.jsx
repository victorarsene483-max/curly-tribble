import { useMemo, useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { useDashboard } from "./DashboardContext"
import "./TasksDueSoon.css"
function getUrgencyTheme(daysLeft) {
  if (daysLeft <= 3) return "red";
  if (daysLeft <= 5) return "orange";
  if (daysLeft <= 7) return "green";
  return "blue";
}



function TasksDueSoon({ maxItems = 3 }) {
  const { assignments, units, addAssignment } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dueSoon = useMemo(() => {
    return assignments
      .filter((a) => !a.completed)
      .map((a) => ({ ...a, daysLeft: getDaysUntil(a.dueDate) }))
      .filter((a) => a.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, maxItems);
  }, [assignments, maxItems]);

    return (
    <div className="tasks-card">
      <div className="tasks-header">
        <h3>Tasks Due Soon</h3>
        <a href="#" className="view-all-link">View all assignments</a>
      </div>

      <div className="tasks-grid">
        {dueSoon.map((task) => {
          const unit = units.find((u) => u.code === task.unitCode);
          const Icon = (unit && UNIT_ICONS[unit.icon]) || BookOpen;
          const theme = unit ? unit.color : "purple";
          const urgency = getUrgencyTheme(task.daysLeft);

          return (
            <div className="task-tile" key={task.id}>
              <span className={`task-days theme-${urgency}`}>
                {task.daysLeft === 0 ? "Due today" : `${task.daysLeft} day${task.daysLeft === 1 ? "" : "s"} left`}
              </span>
              <div className={`task-icon-box theme-${theme}`}>
                <Icon size={18} />
              </div>
              <div className="task-info">
                <p className="task-title">{task.title}</p>
                <p className="task-unit">{task.unitCode}</p>
              </div>
            </div>
          );
        })}

        <button className="task-tile add-task-tile" onClick={() => setIsModalOpen(true)}>
          <div className="task-icon-box theme-neutral">
            <Plus size={18} />
          </div>
          <div className="task-info">
            <p className="task-title">Add Assignment</p>
            <p className="task-unit">Keep track of your work</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default TasksDueSoon;