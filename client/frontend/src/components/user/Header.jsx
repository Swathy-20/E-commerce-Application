import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const Header = () => {



    return (
            <div className="flex flex-col justify-between bg-white">
            <div className="bg-black text-white text-sm text-center py-2">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
                <span className="underline cursor-pointer">ShopNow</span>
              </div>
        
              
            <header className="flex justify-between items-center p-5 border-b text-gray-900">
                <h1 className="text-xl font-bold">ShopNest</h1>
                <nav className="space-x-6  md:block">
                  <Link to="/" className="hover:text-pink-500">Home</Link>
                  <Link to="/contact" className="hover:text-pink-500">Contact</Link>
                  <Link to="/about" className="hover:text-pink-500">About</Link>
                  <Link to="/products" className="hover:text-pink-500">Products</Link>
                  <Link to="/signup" className="hover:text-pink-500">Sign Up</Link>
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                  <input type="text" placeholder="What are you looking for?" className="border px-3 py-1 rounded-md" />
                  <button><i className="fas fa-search"></i></button>
                  <span className="text-sm">English ▾</span>
                </div>
            </header>
            </div>
    )     
    
};