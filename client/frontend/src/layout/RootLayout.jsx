import React, { useEffect, useState } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import {  useSelector,useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUser, saveUser } from "../redux/features/userSlice";

export const RootLayout = () => {

    const user = useSelector((state) => state.user);
    //console.log("user===", user);
    const [isLoading, setIsLoading] = useState(true);
    console.log("user===", user);

    const dispatch = useDispatch();
    const location = useLocation();


    const checkUser = async()=>{
        try {
            const response = await axiosInstance.get("/user/check-user")
            console.log(response,"========response");
            dispatch(saveUser());
            setIsLoading(false);
            
        } catch (error) {
            console.error("Authentication check failed:", error);
            dispatch(clearUser());
            
            
        }
        // const publicPaths = ['/login', '/register', '/'];
        //     if (!publicPaths.includes(location.pathname)) {
        //         navigate('/login');
        //     }
    }
    useEffect(()=>{
        checkUser()
    },[location.pathname])


    return isLoading ? null :(
        <div>
            {user.isUserAuth ? <UserHeader /> : <Header />}
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};


