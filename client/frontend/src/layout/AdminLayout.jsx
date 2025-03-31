import React from "react";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
    return (
        <div>
            <h1>AdminHeader</h1>
            <Outlet />
            <h1>Adminfooter</h1>
        </div>
    );
};