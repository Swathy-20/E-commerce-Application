import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {axiosInstance} from '../../config/axiosInstance';


export const Logout = () => {
  const navigate = useNavigate();
  const location=useLocation();

  const email = location.state?.email || "User";
  const role = location.state?.role || "user";
  const logoutEndpoint = role === "admin" ? "/admin/logout" : "/user/logout";
  const redirectTo = role === "admin" ? "/admin/login" : "/login";

  const handleLogout = async () => {
    try {
      await axiosInstance.get(logoutEndpoint, { withCredentials: true });
      navigate(redirectTo);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
            alt="Logo"
            className="w-12 h-12"
          />
        </div>
        <h2 className="text-xl font-semibold mb-2">Logout</h2>
        <p className="text-gray-600 mb-4">Hi <strong>{email}</strong>,</p>
        <p className="text-gray-600 mb-6">
          Are you sure you want to log out from ShopNest?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};


