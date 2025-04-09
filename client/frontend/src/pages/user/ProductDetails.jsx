import React,{useState} from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Star } from 'lucide-react';
import { IndianRupee } from 'lucide-react';

import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const ProductDetails = () => {
    const {id} = useParams();
    //console.log("Product ID from URL:", id);

    
    const [productDetails, isLoading, error] = useFetch(`/product-detail/detailbyId/${id}`);
    const [selectedImage, setSelectedImage] = useState("");
    
    
    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance({ method: "POST", data: { productId: id }, url: "/cart/add-to-cart" });
            //console.log(response, "=====add to cart ");
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "unable to add product to cart");
        }
        
    };
    


    return (
        <div className="min-h-screen p-8 bg-white">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error:{error.message}</p>}
            {productDetails && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left - Images */}
                    
                    <div className="flex gap-4">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-4">
                            {productDetails?.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`thumb-${index}`}
                                    className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                                        selectedImage === img ? "border-blue-500" : "border-gray-300"
                                    }`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div>
                            <img
                                src={selectedImage || productDetails?.images?.[0]}
                                alt="main"
                                className="w-[400px] h-[500px] object-cover border border-blue-500 rounded"
                            />
                        </div>
                    </div>

                    {/* Right - Details */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">{productDetails.name}</h1>

                        <div className="flex items-center gap-2 text-yellow-500">
                            <Star className="w-5 h-5" fill="yellow" />
                            <span className="text-gray-600">{productDetails.ratings} / 5</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-500">
                            <IndianRupee className="w-5 h-5 text-gray-500"  />
                            <span className="text-2xl font-bold text-gray-800">{productDetails.price}</span>
                        </div>

                       
                        <p className="text-gray-600">{productDetails.description}</p>
                        <p className="text-sm text-gray-500">Brand: {productDetails.brand}</p>
                        <p className="text-sm text-gray-500">Stock: {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                        {/* <p className="text-sm text-gray-500">Specifications: {productDetails.specifications}</p> */}

                        <button
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
                            onClick={handleAddToCart}
                            disabled={productDetails.stock <= 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};