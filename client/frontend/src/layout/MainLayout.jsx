import React, { useEffect, useState }  from "react";
import { useNavigate ,Outlet,useLocation} from "react-router-dom";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import {  useSelector,useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";

import { clearUser, saveUser } from "../redux/features/userSlice";



export const MainLayout = () => {
    const user = useSelector((state) => state.user);
    //console.log("user===", user);
    const [isLoading, setIsLoading] = useState(true);
    // console.log("user===", user);

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
    }
    useEffect(()=>{
            checkUser()
        },[location.pathname])
    
    return isLoading ? null :(
            <div>
                 <Header />
                <div className="min-h-96">
                    <Outlet />
                </div>
                <Footer />
            </div>
        );

}