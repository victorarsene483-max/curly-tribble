import { useState } from "react";
import { Box, Database, Code2, BarChart3, Binary, Wifi, MessageSquare, Atom, Plus } from "lucide-react";
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
  const { units, addUnit } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            </li>
          );
        })}
      </ul>

      <button className="add-unit-btn" onClick={() => setIsModalOpen(true)}>
        <Plus size={16} />
        Add Unit
      </button>


    </div>
  );
}

export default MyUnits;