import "./TodaysSchedule.css"
const ScheduleItems=[
  { startTime: "9:00 AM", endTime: "10:15 AM", title: "COSC 223 Lecture", location: "Building A, Room 101", color: "purple" },
  { startTime: "11:00 AM", endTime: "12:15 PM", title: "MAT 214 Tutorial", location: "Building C, Room 305", color: "blue" },
  { startTime: "2:00 PM", endTime: "3:15 PM", title: "COSC 227 Lecture", location: "Building B, Room 201", color: "orange" },
  { startTime: "4:00 PM", endTime: "5:00 PM", title: "Study Session", location: "Library, Quiet Zone", color: "green", highlight: true },
]
function TodaysSchedule(){
    return(
        <div className="schedule-card">
            <div className="schedule-header">
                <h3>Today's Schedule</h3>
                <a href="#" className="view-calendar">View Calendar</a>
            </div>
            <ul className="schedule-list">
                {ScheduleItems.map(({startTime,endTime,title,location,color,highlight},index)=>(
                    <li
                    className={`schedule-item theme-${color}${highlight ? " highlight" : ""}`}
                    key={`${startTime}-${title}-${index}`}>
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
            </div>
    )

}
export default TodaysSchedule