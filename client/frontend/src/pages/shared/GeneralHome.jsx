import React, { useEffect, useState } from "react";
import home from "../../assets/categories/Home.png"; 
import { Outlet } from "react-router-dom";
import {axiosInstance} from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const categories = [
  "Sarees",
  "Ethnic Wear",
  "Kurtas & Kurtis",
  "Tops & Tunics",
  "Western Wear",
  "Jackets & Shrugs",
  "Handbags & Clutches",
  "Jewellery",
  "Jeans",
  "Footwear"
];

export const GeneralHome = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  
  const handleCategoryClick = (category) => {
    // Encode category to handle special characters like &
    const encodedCategory = encodeURIComponent(category);
    navigate(`/category/${encodedCategory}`);
  };

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/product/productList");
        setProducts(res.data.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ⏳ Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-900">
      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="sidebar" style={{ width: "50%", padding: "1rem" }}>
        <h2 className="font-bold">Categories</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: "pointer", padding: "0.5rem 0" }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
          {/* Banner */}
          <div className="col-span-4">
            <img
              src={home}
              alt="Banner"
              className="w-full h-150 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Flash Sale Section */}
        <div className="mt-12">
          <h3 className="text-red-500 font-semibold">Today's</h3>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">Flash Sales</h2>
            <div className="flex space-x-4 text-center text-sm">
              {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
                <div key={label}>
                  <div className="text-lg font-bold">
                    {Object.values(timeLeft)[index].toString().padStart(2, "0")}
                  </div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Product Cards */}
          <div className="grid grid-cols-4 gap-6 mt-6">
            {Array.isArray(products) && products.length > 0 ? (
              products.slice(0, 4).map((item) => {
                //console.log(item.images);
                return(

                
              
                <div
                  key={item._id}
                  className="border rounded-xl p-4 relative hover:shadow-md"
                >
                  {item.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {item.discount}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex justify-end gap-2">
                    <button>🤍</button>
                    <Link to={`/product-detail/detailbyId/${item._id}`}>👁️</Link>
                  </div>
                  <img
                    src={item.images?.url || item.images || "/assets/placeholder.jpg"}
                    alt={item.name}
                    
                    className="w-full h-48 object-contain"
                  />
                 

                  <p className="mt-4 font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <button className="w-full mt-2 bg-black text-white py-1 rounded">
                    Add To Cart
                  </button>
                </div>
                   
              )
              }
              ))
            : (
              <p className="text-gray-500 col-span-4">No products available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Nested Routes */}
      <Outlet />
    </div>
  );
};

