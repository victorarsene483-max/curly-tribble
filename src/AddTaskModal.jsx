import { useState } from "react";
import { X } from "lucide-react";
import "./AddTaskModal.css";

const TASK_TYPES = ["Assignment", "Group Work", "Quiz", "Project"];

function AddTaskModal({ units, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(TASK_TYPES[0]);
  const [unitCode, setUnitCode] = useState(units[0]?.code || "");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !unitCode || !dueDate) {
      setError("Please fill in the title, topic, and due date.");
      return;
    }

    onSubmit({ title: title.trim(), type, unitCode, dueDate });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="add-task-title">Add Task</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-field">
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Database design report"
              autoFocus
            />
          </label>

          <label className="modal-field">
            <span>Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {TASK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-field">
            <span>Topic / Unit</span>
            <select value={unitCode} onChange={(e) => setUnitCode(e.target.value)}>
              {units.map((u) => (
                <option key={u.code} value={u.code}>
                  {u.code} — {u.name}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-field">
            <span>Due date</span>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;