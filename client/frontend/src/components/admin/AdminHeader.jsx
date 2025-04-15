import React from "react";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <nav className="space-x-4">
        <Link to="/admin/profile" className="hover:underline">Profile</Link>
        <Link to="/admin/users" className="hover:underline">Users</Link>
        <Link to="/admin/products" className="hover:underline">Products</Link>
        <Link to="/admin/logout" className="hover:underline text-red-400">Logout</Link>
      </nav>
    </header>
  );
};
