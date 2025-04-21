import React, { useEffect, useState }  from "react";
import { Outlet,useLocation} from "react-router-dom";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import {  useSelector,useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";

import { clearUser, saveUser } from "../redux/features/userSlice";
import { UserHeader } from "../components/user/UserHeader";
import { AdminHeader } from "../components/admin/AdminHeader";


export const MainLayout = () => {
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
  
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/user/check-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(saveUser(response.data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setIsLoading(false);
      }
    };
  
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get("/admin/check-admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        dispatch(saveUser(response.data));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      if (isAdminRoute) {
        checkAdmin();
      } else {
        checkUser();
      }
    }, [location.pathname]);
  
    return isLoading ? null : (
      <div>
        {user?.isUserAuth ? (
          isAdminRoute ? <AdminHeader /> : <UserHeader />
        ) : (
          <Header />
        )}
  
        <div className="min-h-96">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  };
  