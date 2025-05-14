import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosInstance.get("/wishlist/get");
        setWishlist(response.data?.wishlist || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load wishlist");
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axiosInstance.delete(`/wishlist/remove/${productId}`);
      setWishlist((prev) => prev.filter((item) => item.productId._id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif font-semibold text-center mb-10">Wishlist</h1>

      <div className="flex flex-col gap-6">
        {wishlist.map((item) => {
          const product = item.productId;
          if (!product) return null;

          return (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-6">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-medium">{product.name}</h2>
                  <p className="text-lg font-semibold mt-1">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(product._id)}
                className="px-5 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
