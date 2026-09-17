import { useState } from "react";
import profilePic from "./assets/profile.jpg";
import {
  Home,
  BookOpen,
  ClipboardList,
  Calendar,
  Sparkles,
  StickyNote,
  Compass,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronDown,
  Sun,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "My Units", icon: BookOpen },
  { label: "Assignments", icon: ClipboardList },
  { label: "Calendar", icon: Calendar },
  { label: "AI Assistant", icon: Sparkles },
  { label: "Notes", icon: StickyNote },
  { label: "Resources", icon: Compass },
  { label: "Study Sessions", icon: Users },
  { label: "Grades", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleNavClick(label) {
    setActiveItem(label);
    setIsMobileOpen(false); // auto-close drawer after picking a page on mobile
  }

  return (
    <>
      <button
        className="sidebar-hamburger"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)} />
      )}

      <div className={`sidebar${isMobileOpen ? " open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <GraduationCap size={20} color="#fff" />
            </div>
            <span className="sidebar-logo-text">EduMate</span>
            <button
              className="sidebar-close-btn"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="sidebar-nav">
            {navItems.map(({ label, icon: Icon }) => {
              const isActive = activeItem === label;
              return (
                <li key={label}>
                  <button
                    className={`sidebar-nav-item${isActive ? " active" : ""}`}
                    onClick={() => handleNavClick(label)}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-profile">
            <img src={profilePic} alt="Arsene" className="sidebar-avatar" />
            <div className="sidebar-profile-text">
              <p className="sidebar-profile-name">Arsene V</p>
              <p className="sidebar-profile-link">View Profile</p>
            </div>
            <ChevronRight size={16} className="sidebar-chevron" />
          </button>

          <button className="sidebar-theme-toggle">
            <span className="sidebar-theme-label">
              <Sun size={16} />
              Light Mode
            </span>
            <ChevronDown size={16} className="sidebar-chevron" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;