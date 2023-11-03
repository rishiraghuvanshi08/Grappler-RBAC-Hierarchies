import React from 'react'
import { DoLogout } from '../Authentication'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
// import UsersDashboard from './UsersDashboard';
import AdminDashboard from './AdminDashboard';
const Dashboard = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem('data');
  const parsedData = JSON.parse(data);
  const decodedToken = jwt_decode(parsedData.jwtToken);
  const role = decodedToken.role;
  console.log("role",role);
  return (
    <div>
      {(role === "ROLE_ADMIN") ? <AdminDashboard/> : <></>}
      <button onClick={() => {
        DoLogout(() => {
          navigate("/login");
        })
      }}>Logout</button>
    </div>
  )
}
export default Dashboard