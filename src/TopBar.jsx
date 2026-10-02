import { useState, useRef, useEffect } from "react";
import { Bell, Calendar, ChevronDown, Check } from "lucide-react";
import "./Topbar.css"
function getGreeting(){
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

const semesters = [" Y3SEM 1, 2026", "Y3SEM 2, 2027", "Y2SEM 2, 2026"];

function TopBar({ userName = "Arsene", notificationCount = 3 }) {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
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

  return (
    <div className="topbar">
      <div className="topbar-greeting-block">
        <p className="topbar-greeting">{getGreeting()}! Arsene 👋</p>
        <p className="topbar-description">Here's what's happening with your semester.</p>
      </div>

      <div className="topbar-actions">
        <button className="topbar-icon-btn" aria-label="Notifications">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="topbar-badge">{notificationCount}</span>
          )}
        </button>

        <div className="topbar-semester-wrapper" ref={dropdownRef}>
          <button
            className="topbar-semester-selector"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Calendar size={16} />
            <span>{selectedSemester}</span>
            <ChevronDown
              size={16}
              className={`topbar-chevron${isOpen ? " open" : ""}`}
            />
          </button>

          {isOpen && (
            <ul className="topbar-semester-menu">
              {semesters.map((sem) => (
                <li key={sem}>
                  <button
                    className="topbar-semester-option"
                    onClick={() => {
                      setSelectedSemester(sem);
                      setIsOpen(false);
                    }}
                  >
                    <span>{sem}</span>
                    {sem === selectedSemester && <Check size={14} />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;