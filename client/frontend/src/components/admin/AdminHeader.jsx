import React from "react";
import { Link } from "react-router-dom";
import Shop from "../../assets/categories/Shop.png";


export const AdminHeader = () => {
  return (
    <header className="bg-white py-4 px-6 shadow-md flex justify-between items-center">
      <img src={Shop} className="w-100 h-30 rounded-lg"></img>
      <nav className="text-center space-x-4">
        <Link to="/" className="hover:underline text-gray-800">Home</Link>
        
        <Link to="/admin/product" className="hover:underline text-gray-800">Products</Link>
        <Link to="/admin/logout" className="hover:underline text-gray-800">Logout</Link>
      </nav>
    </header>
  );
};
