// import React, { useState } from "react";

// export const CreateProductForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: null,
//     rating: "",
//     seller: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       const file = files[0];
//       setFormData({ ...formData, image: file });
//       setPreviewImage(URL.createObjectURL(file));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     data.append("rating", formData.rating);
//     data.append("seller", formData.seller);
//     if (formData.image) {
//       data.append("image", formData.image);
//     }

//     try {
//       const response = await fetch("/product/create-product", {
//         method: "POST",
//         body: data,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert("Product created successfully!");
//         onProductCreate(result); // optional: update product list in parent
//       } else {
//         alert("Failed to create product: " + result.message);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Error creating product.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg"
//     >
//       <h2 className="text-xl font-bold mb-4">Add New Product</h2>

//       <div>
//         <label className="block font-medium">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full border px-3 py-2 rounded"
//         ></textarea>
//       </div>

//       <div>
//         <label className="block font-medium">Price ($)</label>
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Rating (0-5)</label>
//         <input
//           type="number"
//           name="rating"
//           min="0"
//           max="5"
//           step="0.1"
//           value={formData.rating}
//           onChange={handleChange}
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Seller</label>
//         <input
//           type="text"
//           name="seller"
//           value={formData.seller}
//           onChange={handleChange}
//           required
//           className="w-full border px-3 py-2 rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Image</label>
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={handleChange}
//           className="w-full"
//         />
//         {previewImage && (
//           <img
//             src={previewImage}
//             alt="Preview"
//             className="mt-2 h-24 object-contain"
//           />
//         )}
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

import React,{ useState } from 'react';
import {axiosInstance} from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';


import toast from "react-hot-toast";

export const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    
    price: "",
    rating: "",
    image: null,
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    
    form.append("price", formData.price);
    form.append("rating", formData.rating);
    form.append("image", formData.image);

    try {
      const res = await axiosInstance.post("/product/create-product", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message || "Product added!");
      
      setFormData({
        name: "",
        description: "",
        price: "",
        rating: "",
        image: null,
      });
      const productId = res.data?.product?._id; 
if (productId) {
  navigate(`/admin/add-product-details/${productId}`);
}
    } catch (err) {
      console.error("Upload error:", err.response);
      toast.error(err.response?.data?.message || "Error while uploading");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1 to 5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          min={1}
          max={5}
          step="0.1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};




