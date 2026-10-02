import { useState } from "react";
import { Box, Database, Code2, BarChart3, Binary, Wifi, MessageSquare, Atom, Plus, X } from "lucide-react";
import { useDashboard } from "./DashboardContext";
import "./MyUnits.css"


const ICONS = {
  box: Box,
  database: Database,
  code: Code2,
  chart: BarChart3,
  binary: Binary,
  wifi: Wifi,
  message: MessageSquare,
  atom: Atom,
};

function MyUnits() {
  const { units, addUnit, deleteUnit } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    addUnit({
      code: code.trim(),
      name: name.trim(),
    });

    setCode("");
    setName("");
    setIsModalOpen(false);
  }

  return (
    <div className="my-units-card">
      <div className="my-units-header">
        <h3>My Units</h3>
        <a href="#" className="view-all-link">View all</a>
      </div>

      <ul className="unit-list">
        {units.map((unit) => {
          const Icon = ICONS[unit.icon] || Box;
          return (
            <li className="unit-row" key={unit.id}>
              <div className={`unit-icon-box theme-${unit.color}`}>
                <Icon size={20} />
              </div>
              <div className="unit-info">
                <p className="unit-code">{unit.code}</p>
                <p className="unit-name">{unit.name}</p>
              </div>
              <div className="unit-meta">
                <span className="unit-assignments">{unit.assignmentsCount} assignments</span>
                <div className="unit-progress-track">
                  <div
                    className={`unit-progress-fill theme-${unit.color}`}
                    style={{ width: `${unit.progress}%` }}
                  />
                </div>
                <span className="unit-progress-value">{unit.progress}%</span>
              </div>
              <button
                className="drop-unit-btn"
                onClick={() => deleteUnit(unit.id)}
                title="Drop unit"
              >
                <X size={16} />
              </button>
            </li>
          );
        })}
      </ul>

      <button className="add-unit-btn" onClick={() => setIsModalOpen(true)}>
        <Plus size={16} />
        Add Unit
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Unit</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Unit code
                <input
                  type="text"
                  placeholder="e.g. COSC 401"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoFocus
                />
              </label>
              <label>
                Unit name
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="modal-submit-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyUnits;