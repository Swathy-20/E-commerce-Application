import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const Header = () => {

const navigate = useNavigate()

    return (
        <div className="flex justify-between items-center p-14 h-20 shadow-2xl ">
            <div>
                <h1 className="text-3xl font-bold">Logo</h1>
            </div>
            <div className="flex justify-center items-center gap-16">
                <nav>
                    <ul className="flex justify-center items-center gap-10 text-md">
                        <Link to={"/"}>
                            {" "}
                            <li>Home</li>{" "}
                        </Link>
                        <Link to={"/about"}>
                            {" "}
                            <li>About</li>{" "}
                        </Link>
                        <Link to={"/products"}>
                            {" "}
                            <li>Products</li>{" "}
                        </Link>
                    </ul>
                </nav>
                <div className="flex justify-center gap-3">
                <DarkMode />
                   
                    <button className="btn btn-primary" onClick={()=>navigate('/signup')} >Join Us</button>
                </div>
            </div>
        </div>
    );
};