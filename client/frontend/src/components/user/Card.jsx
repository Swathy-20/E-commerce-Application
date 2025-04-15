import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductCards = ({ product }) => {
    const navigate = useNavigate();
    

    return (
        
        <div className="border rounded-lg shadow hover:bg-gray-100 transition duration-200  bg-white text-gray-900">
                    

            <main className="p-8">
                
                            <img
                                src={product.images || "https://via.placeholder.com/300"}
                                alt={product.name}
                                className="w-80 h-80 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                                <p className="text-pink-600 font-semibold mb-2">₹{product.price}</p>
                                <button className="btn btn-primary" onClick={() => navigate(`/product-detail/detailbyId/${product._id}`)}>
                                   Read More
                                </button>
                
                            </div>
                    
          
        
      </main>

        </div>
        
    );
};