import './App.css';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import Users from './Pages/Users';
import Project from './Pages/Project';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Hierachy from './Pages/Hierachy';
import AddUser from './Pages/AddUser';
import HeirachyId from './Pages/HierarchyId';
import AddProject from './Pages/AddProject';
import Teams from './Pages/Teams';
import TeamMember from './Pages/TeamMember';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Hierachy/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/teams" element={<Teams/>} />
            <Route path="/teams/:id/teamDetails" element={<TeamMember/>} />
            <Route path="/projects" element={<Project/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/users/addUser" element={<AddUser/>} />
            <Route path="/users/hierarchy/reporting/:id" element={<HeirachyId/>} />
            <Route path="/projects/addProject" element={<AddProject/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
