import React, { useEffect, useState }  from "react";
import { Outlet,useLocation} from "react-router-dom";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import {  useSelector,useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";

import { clearUser, saveUser } from "../redux/features/userSlice";
import { UserHeader } from "../components/user/UserHeader";



export const MainLayout = () => {
    const user = useSelector((state) => state.user);
    //console.log("user===", user);
    const [isLoading, setIsLoading] = useState(true);
    // console.log("user===", user);

    const dispatch = useDispatch();
    const location = useLocation();


    const checkUser = async () => {
        
            const token = localStorage.getItem("token"); // Adjust based on where you store the token
            if (!token) {
                setIsLoading(false);
                return; // Stop execution if there's no token
            }
            try {
            const response = await axiosInstance.get("/user/check-user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response, "========response");
            dispatch(saveUser(response.data)); // Ensure you store user data correctly
        } catch (error) {
            console.error("Authentication check failed:", error);
            dispatch(clearUser());
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(()=>{
            checkUser()
        },[location.pathname])
        //console.log("User is authenticated:", user?.isUserAuth)
    
    return isLoading ? null :(
            <div>
            
                 {user?.isUserAuth ? <UserHeader /> : <Header />}

                <div className="min-h-96">
                    <Outlet />
                </div>
                <Footer />
            </div>
        );

}