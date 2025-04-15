import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoutesAdmin = () => {
    const { isAdminAuth } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdminAuth) {
            navigate("/admin/profile");
        }
    }, [isAdminAuth, navigate]);
    if (!isAdminAuth) return null;

    return <Outlet />;
};
