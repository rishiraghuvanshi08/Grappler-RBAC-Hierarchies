import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { IsLoggedIn } from '../Authentication';
const PrivateRoute = () => {
    if(IsLoggedIn()) {
        return <Outlet/>
    }
    else {
        return <Navigate to={"/login"} />;
    }
}
export default PrivateRoute