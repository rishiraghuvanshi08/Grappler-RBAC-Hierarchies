import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./Pages/Home";
import Users from "./Pages/Users";
import Project from "./Pages/Project";
import Login from "./Pages/Login";
import Hierachy from "./Pages/Hierachy";
import AddUser from "./Pages/AddUser";
import HeirachyId from "./Pages/HierarchyId";
import AddProject from "./Pages/AddProject";
import Teams from "./Pages/Teams";
import TeamMember from "./Pages/TeamMember";
import { ToastContainer } from "react-toastify";
import PrivateRoute from './Pages/PrivateRoute';
// import { DoLogout } from '../Authentication'
// import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UsersDashboard from "./Pages/UserDashboard";
function App() {

  return (
    <div className="App">
      <Router>
        <div className="pages">
          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PrivateRoute />} >
              <Route path="hierarchy" element={<Hierachy />} />
              <Route path="users" element={<Users />} />
              <Route path="teams" element={<Teams />} />
              <Route path="teams/:id/teamDetails" element={<TeamMember />} />
              <Route path="projects" element={<Project />} />
              <Route path="users/addUser" element={<AddUser />} />
              <Route
                path="users/hierarchy/reporting/:id"
                element={<HeirachyId />}
              />
              <Route path="projects/addProject" element={<AddProject />} />
            </Route>
            <Route path="/users" element={<PrivateRoute />} >
              <Route path="dashboard" element={<UsersDashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
      {/* <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<PrivateRoute />} >
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
