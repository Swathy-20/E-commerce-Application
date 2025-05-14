import React, { useState,useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Star, IndianRupee, Minus, Plus  } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

export const ProductDetails = ({productId}) => {
  const { id } = useParams();
  const [productDetails, isLoading, error] = useFetch(`/product-detail/detailbyId/${id}`);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  //const [loading,setLoading]= useState(true)


  
  const handleAddToWishlist = async () => {
    try {
      const response = await axiosInstance.post("/wishlist/add", { productId: id });
      toast.success("Product added to wishlist");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to add to wishlist");
    }
  };
  

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }  
    try {
      const response = await axiosInstance({
        method: "POST",
        data: { productId: id, quantity,selectedSize },
        url: "/cart/add-to-cart",
      });
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to add product to cart");
    }
  };
  


  return (
    <div className="min-h-screen p-8 bg-white">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

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

            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-gray-500" />
              <span className="text-2xl font-bold text-gray-800">{productDetails.price}</span>
            </div>

            <p className="text-gray-600">{productDetails.description}</p>

            <p className="text-sm text-gray-500">Brand: {productDetails.brand}</p>
            <p className="text-sm text-gray-500">
              Stock: {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Colors */}
            {productDetails.colors?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Available Colors:</h3>
                <div className="flex gap-2">
                  {productDetails.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {productDetails.sizes?.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Sizes:</h3>
                <div className="flex gap-2">
                  {productDetails.sizes.map((size, index) => (
                    <span
                      key={index}
                      className={`border px-3 py-1 rounded cursor-pointer text-sm text-gray-700 hover:bg-gray-100 ${
    selectedSize === size ? "bg-gray-200 border-blue-500" : ""
  }`}
                      onClick={() => setSelectedSize(size)}
       
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mt-2 text-gray-900">
              <span className="font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>

            </div>
            {/* Specifications */}
            {productDetails.specifications && (
              <div>
                <h3 className="font-semibold text-gray-700">Specifications:</h3>
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  {productDetails.specifications.weight && (
                    <li>Weight: {productDetails.specifications.weight}</li>
                  )}
                  {productDetails.specifications.material && (
                    <li>Material: {productDetails.specifications.material}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Return Policy */}
            {productDetails.returnPolicy && (
              <div className="text-sm text-gray-500 mt-2">
                <strong>Return Policy:</strong> {productDetails.returnPolicy}
              </div>
            )}
           

            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
              onClick={handleAddToCart}
              disabled={productDetails.stock <= 0}
            >
              Add to Cart
            </button>
            <button
  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
  onClick={handleAddToWishlist}
>
  Add to Wishlist
</button>

          </div>
        </div>
      )}
    </div>
  );
};
