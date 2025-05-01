import React from "react";
import { CircleUser, Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
//import { DarkMode } from "../shared/DarkMode";
import Shop from "../../assets/categories/Shop.png";
export const UserHeader = () => {
    //console.log("UserHeader is rendering");

    return (
        <div className="flex justify-between items-center w-full px-20  h-30 shadow-2xl bg-white text-gray-900 ">
            <Link to={"/"}>
                <img src={Shop} className="w-100 h-30 rounded-lg"></img>
            </Link>
            <nav className="flex gap-8 items-center font-semibold">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/products"}>Products</Link>
                <Link to={"/my-products"}>My Products</Link>
            </nav>

            <div className="flex gap-14 items-center ">
                
                <Link to={"/user/cart"}>
                    <ShoppingBag />
                </Link>
                <Link to={"/user/wishlist"}>
                
                    <Heart />
                </Link>
                
                <Link to={"/user/profile"}>
                    <CircleUser />
                </Link>
            </div>
        </div>
    );
};