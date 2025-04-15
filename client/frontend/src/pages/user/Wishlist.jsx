import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("/wishlist/get");
      console.log("Fetched wishlist data:", res.data);

      const wishlistProducts = res?.data?.products || [];
      setWishlistItems(wishlistProducts);
    } 
    catch (error) {
      console.error("Error fetching wishlist", error);
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axiosInstance.delete(`/wishlist/remove/${productId}`);
      toast.success("Removed from wishlist");
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing item from wishlist", error);
      toast.error("Unable to remove item");
    }
  };

  // const handleMoveAllToCart = () => {
  //   // TODO: Implement move to cart logic
  //   toast.success("Moved all items to bag!");
  // };

  

  if (loading) return <p className="p-8">Loading wishlist...</p>;
 

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistItems.map(product => (
          <div key={product._id} className="border p-4 rounded shadow-sm">
            <img src={product.images} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <button
              onClick={() =>handleRemove(product._id)}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
