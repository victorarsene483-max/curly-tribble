import {BookOpen,CalendarCheck,CheckCircle2,TrendingUp} from "lucide-react"
import "./OverviewStats.css"
function OverviewStats(){
return(
    <div className="OverviewStats">
        <div className="stats-grid theme-purple">
            <div className="stats-icon">
                <BookOpen size={22}/>
            </div>
            <div>
                <span>8</span>
                <p>Total Units</p>
                <small>This semester</small>
            </div>
        </div>
        <div className="stats-grid theme-red">
            <div className="stats-icon">
                <CalendarCheck size={22}/>
            </div>
            <div>
                <span>3</span>
                <p>Assignments Due</p>
                <small>This week</small>
            </div>
        </div>
        <div className="stats-grid theme-green">
            <div className="stats-icon">
                <CheckCircle2 size={22}/>
            </div>
            <div>
                <span>17</span>
                <p>Completed</p>
                <small>Assignments</small>
            </div>
        </div>
         <div className="stats-grid theme-orange">
        <div className="stats-icon">
          <TrendingUp size={22} />
        </div>
        <div>
          <span>72%</span>
          <p>Overall Progress</p>
        </div>
      </div>

    </div>
)
}

export default OverviewStats