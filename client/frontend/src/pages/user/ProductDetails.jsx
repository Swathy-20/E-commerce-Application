import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const ProductDetails = () => {
    const {id} = useParams();
    console.log("Product ID from URL:", id);

    const [productDetails, isLoading, error] = useFetch(`/product-detail/detailbyId/${id}`);
    console.log("Fetched Product Details:", productDetails);
    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance({ method: "POST", data: { productId: id }, url: "/cart/add-to-cart" });
            console.log(response, "=====add to cart RES");
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "unable to add product to cart");
        }
        
    };
    


    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error:{error.message}</p>}
            {productDetails &&(
           
                <div>
                    <h1>{productDetails?.name}</h1>
                    <p>{productDetails?.description}</p>
                
                    <img src={productDetails?.images} alt="product-image" />
                
                <button className="btn btn-success" onClick={handleAddToCart}>Add to Cart</button>
                </div>
                ) 
            }
            
        </div>
    );
};