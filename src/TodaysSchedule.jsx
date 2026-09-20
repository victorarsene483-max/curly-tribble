import "./TodaysSchedule.css"
import { TIMETABLE } from "./timetableData";
import { useDashboard } from "./DashboardContext";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function TodaysSchedule() {
  const { units } = useDashboard();
  const today = DAY_NAMES[new Date().getDay()];

  const todaysItems = TIMETABLE
    .filter((entry) => entry.day === today)
    .sort((a, b) => new Date(`1/1/2000 ${a.start}`) - new Date(`1/1/2000 ${b.start}`))
    .map((entry) => {
      const unit = units.find((u) => u.code === entry.code);
      return {
        startTime: entry.start,
        endTime: entry.end,
        title: unit ? `${unit.code} ${unit.name}` : entry.code,
        location: entry.room,
        color: unit ? unit.color : "purple",
      };
    });

  return (
    <div className="schedule-card">
      <div className="schedule-header">
        <h3>Today's Schedule</h3>
        <a href="#" className="view-calendar">View Calendar</a>
      </div>

      {todaysItems.length === 0 ? (
        <p className="schedule-empty">No classes scheduled today.</p>
      ) : (
        <ul className="schedule-list">
          {todaysItems.map(({ startTime, endTime, title, location, color, highlight }, index) => (
            <li
              className={`schedule-item theme-${color}${highlight ? " highlight" : ""}`}
              key={`${startTime}-${title}-${index}`}
            >
              <div className="schedule-time">
                <span>{startTime}</span>
                <span>{endTime}</span>
              </div>
              <div className="schedule-bar" />
              <div className="schedule-info">
                <p className="schedule-title">{title}</p>
                <p className="schedule-location">{location}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodaysSchedule;