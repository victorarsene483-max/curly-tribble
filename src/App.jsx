import { DashboardProvider } from "./DashboardContext.jsx";
import{useState} from "react";
import OverviewStats from "./OverviewStats.jsx";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import MyUnits from "./MyUnits.jsx";
import UpcomingDeadlines from "./UpcomingDeadlines.jsx";
import StudyTime from "./StudyTime.jsx";
import TodaysSchedule from "./TodaysSchedule.jsx";
import TasksDueSoon from "./TasksDueSoon.jsx";
import "./App.css";
import AIAssistant from "./AIAssistant.jsx";
import Login from "./Login.jsx"
const myUnits = [];
const myAssignments = [];

function App() {
  const[user,setUser]=useState(null)

 if (!user) {
    return <Login onLogin={setUser} />;
  }
  return (
    <DashboardProvider initialUnits={myUnits} initialAssignments={myAssignments}>
      <div className="app-layout">
        <Sidebar/>
        <div className="app-main">
          <TopBar/>
          <div className="dashboard-body">
            <div className="main-column">
              <OverviewStats/>
              <div className="units-deadlines-grid">
                <MyUnits/>
                <UpcomingDeadlines/>
              </div>
              <StudyTime/>
            </div>
            <div className="right-column">
              <TodaysSchedule/>
              <AIAssistant userName="Arsene" />
            </div>
          </div>
          <TasksDueSoon/>
        </div>

      </div>
    </DashboardProvider>
  );
}

export default App;