import { useState,useRef,useEffect,useMemo } from "react";
import { ChevronDown } from "lucide-react";
import "./StudyTemp.css"
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DefaultPeriodData = {
  "This week": [70, 130, 40, 120, 90, 45, 30], // minutes per day, Mon–Sun
  "Last week": [60, 100, 80, 60, 110, 20, 15],
};
const Periods=Object.keys(DefaultPeriodData);
const AxisMaxHours=6;

function formatDuration(totalMinutes){
    const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
function StudyTime({periodData = DefaultPeriodData, onViewDetails}){
   const [selectedPeriod, setSelectedPeriod] = useState(Periods[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    } 
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dailyMinutes = periodData[selectedPeriod] || [];

  const totalMinutes = useMemo(
    () => dailyMinutes.reduce((sum, m) => sum + m, 0),
    [dailyMinutes]
  );

  return(
    <div className="study-time-card">
      <div className="study-time-header">
        <h3>Study Time</h3>
        <div className="period-wrapper" ref={dropdownRef}>
          <button className="period-selector" onClick={() => setIsOpen((p) => !p)}>
            <span>{selectedPeriod}</span>
            <ChevronDown size={14} className={`period-chevron${isOpen ? " open" : ""}`} />
          </button>
          {isOpen && (
            <ul className="period-menu">
              {PERIODS.map((period) => (
                <li key={period}>
                  <button
                    className="period-option"
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsOpen(false);
                    }}
                  >
                    {period}
                  </button>
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <p className="study-time-total">{formatDuration(totalMinutes)}</p>
      <p className="study-time-label">Total study time</p>
      <div className="study-chart">
        <div className="study-chart-axis">
          <span>{AxisMaxHours}h</span>
          <span>{(AxisMaxHours * 2) / 3}h</span>
          <span>{AxisMaxHours / 3}h</span>
          <span>0h</span>
        </div>
        <div className="study-chart-bars">
          {DAYS.map((day, i) => {
            const minutes = dailyMinutes[i] || 0;
            const heightPct = Math.min(
              100,
              (minutes / (AxisMaxHours * 60)) * 100
            );
            return (
              <div className="study-bar-col" key={day}>
                <div className="study-bar-track">
                  <div
                    className="study-bar-fill"
                    style={{ height: `${heightPct}%` }}
                    title={formatDuration(minutes)}
                  />
                </div>
                <span className="study-bar-label">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="study-details-link" onClick={onViewDetails}>
        View detailed statistics
      </button>
    </div>
  );
}

export default StudyTime;