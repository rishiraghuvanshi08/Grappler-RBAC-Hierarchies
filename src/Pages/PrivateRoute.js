import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { IsLoggedIn } from '../Authentication';
import NavBar from '../Components/NavBar';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = () => {
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    const decodedToken = jwtDecode(parsedData.jwtToken);
    const role = decodedToken.role;
    console.log("role", role);
    if (IsLoggedIn()) {
        return (
            <>
                {role == "ROLE_ADMIN" ? <NavBar /> : ""}
                <Outlet />
            </>
        )
    }
    else {
        return <Navigate to={"/login"} />;
    }
}
export default PrivateRoute