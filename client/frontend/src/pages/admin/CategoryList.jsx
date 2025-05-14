import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
    const [imagePreviews, setImagePreviews] = useState({});
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/product-detail/category-summary'); 
        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      

      {/* Main content */}
      <main className="flex-1 p-6">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>

        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
  <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
    <img
      src={imagePreviews[category.category] || category.image}
      alt={category.category}
      className="w-full h-48 object-cover rounded mb-4"
    />

    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews((prev) => ({
              ...prev,
              [category.category]: reader.result,
            }));
          };
          reader.readAsDataURL(file);
        }
      }}
      className="mb-2"
    />

    <h2 className="text-xl font-semibold">{category.category}</h2>
    <p className="text-gray-500">{category.productCount} products</p>
    <div className="flex space-x-4 mt-4 text-sm text-blue-600">
      <button className="hover:underline">Edit</button>
      <button className="hover:underline">View</button>
      <button className="hover:underline text-red-500">Delete</button>
    </div>
  </div>
))}

          </div>
        )}
      </main>
    </div>
  );
};


