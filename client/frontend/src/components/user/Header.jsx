import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
//import { DarkMode } from "../shared/DarkMode";
import { Search, UserCircle } from "lucide-react";


export const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

    return (
            <div className="flex flex-col justify-between bg-white">
            <div className="bg-black text-white text-sm text-center py-2">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
                <span className="underline cursor-pointer">ShopNow</span>
              </div>
        
              
            <header className="flex justify-between items-center p-5 border-b text-gray-900">
            <div className="text-2xl font-bold text-blue-600">ShopNest</div>
                <nav className="space-x-6  md:block">
                  <Link to="/" className="hover:text-pink-500">Home</Link>
                  <Link to="/contact" className="hover:text-pink-500">Contact</Link>
                  <Link to="/about" className="hover:text-pink-500">About</Link>
                  <Link to="/products" className="hover:text-pink-500">Products</Link>
                  <Link to="/signup" className="hover:text-pink-500">Sign Up</Link>
                  <Link to="/login" className="hover:text-pink-500">Login</Link>

                  
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                 
                  
                <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products"
      />
      <button onClick={handleSearch}>
      <Search className="text-gray-500" />
      </button>
          
                </div>
            </header>
            </div>
    )     
    
};