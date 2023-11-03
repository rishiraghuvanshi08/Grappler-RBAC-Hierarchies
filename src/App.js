import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Pages/PrivateRoute';
// import { DoLogout } from '../Authentication'
// import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
// import jwt_decode from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  // const navigate = useNavigate();
  // const data = localStorage.getItem('data');
  // const parsedData = JSON.parse(data);
  // const decodedToken = jwt_decode(parsedData.jwtToken);
  // const role = decodedToken.role;
  // console.log("role",role);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Hierachy />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id/teamDetails" element={<TeamMember />} />
            <Route path="/projects" element={<Project/>} />
            <Route path="/Login" element={<Login />} />
            {/* <Route path="/temp" element={<HierachyTemp/>}/> */}
            <Route path="/users/addUser" element={<AddUser />} />
            <Route
              path="/users/hierarchy/reporting/:id"
              element={<HeirachyId />}
            />
            <Route path="/projects/addProject" element={<AddProject />} />
            <Route path="/users" element={<PrivateRoute/>} >
              <Route path="dashboard" element={<Dashboard/>} />
            </Route>
          </Routes>
        </div>
      </Router>
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
