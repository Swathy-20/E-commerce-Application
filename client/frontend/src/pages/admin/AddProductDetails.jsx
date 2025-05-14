// import React, { useState,useEffect } from "react";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// import { axiosInstance } from "../../config/axiosInstance";

// export const DetailProductForm = () => {
//   const [formData, setFormData] = useState({
//   //  productId:"",
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     brand: "",
//     stock: "",
//     ratings: "",
//     returnPolicy: "",
//   });
//   const { productId } = useParams();

// useEffect(() => {
//   setFormData((prev) => ({
//     ...prev,
//     productId: productId || "",
//   }));
// }, [productId]);


//   const [images, setImages] = useState([]);
//   const [sizes, setSizes] = useState([""]);
// const [colors, setColors] = useState([""]);
// const [specifications, setSpecifications] = useState({ material: "", weight: "" });

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// const handleAddField = (type) => {
//     if (type === "sizes") setSizes([...sizes, ""]);
//     if (type === "colors") setColors([...colors, ""]);
//   };

  
// const handleSizeChange = (i, value) => {
//     const newSizes = [...sizes];
//     newSizes[i] = value;
//     setSizes(newSizes);
//   };
  
//   const handleColorChange = (i, value) => {
//     const newColors = [...colors];
//     newColors[i] = value;
//     setColors(newColors);
//   };
  
// const handleSpecificationChange = (key, value) => {
//     setSpecifications({ ...specifications, [key]: value });
//   };
  

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    

//     const data = new FormData();
   

//     for (const key in formData) {
//         data.append(key, formData[key]);
//     }
//     images.forEach((img) => data.append("images", img));

//     sizes.forEach((size) => data.append("sizes", size));
//   colors.forEach((color) => data.append("colors", color));
//   for (const key in specifications) {
//     data.append(`specifications[${key}]`, specifications[key]);
//   }

 
//     try {
//       const res = await axiosInstance.post("product-detail/create_details", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       toast.success(res.data.message || "Product details added!");
//       //console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Error while uploading");

//     }
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Product Detail</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
  
       
//         {[
          
//           "name",
//           "description",
//           "price",
//           "category",
//           "brand",
//           "stock",
//           "ratings",
//           "returnPolicy"
//         ].map((field) => (
//           <div key={field}>
//             <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
//             <input
//               type="text"
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
//             />
//           </div>
//         ))}
  
//         {/* Sizes */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Sizes</label>
//           {sizes.map((size, i) => (
//             <input
//               key={i}
//               type="text"
//               value={size}
//               onChange={(e) => handleSizeChange(i, e.target.value)}
//               placeholder={`Size ${i + 1}`}
//               className="mt-1 block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={() => handleAddField("sizes")}
//             className="text-blue-600 text-sm"
//           >
//             + Add Size
//           </button>
//         </div>
  
//         {/* Colors */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Colors</label>
//           {colors.map((color, i) => (
//             <input
//               key={i}
//               type="text"
//               value={color}
//               onChange={(e) => handleColorChange(i, e.target.value)}
//               placeholder={`Color ${i + 1}`}
//               className="mt-1 block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={() => handleAddField("colors")}
//             className="text-blue-600 text-sm"
//           >
//             + Add Color
//           </button>
//         </div>
  
//         {/* Specifications */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
//           <input
//             type="text"
//             placeholder="Material"
//             value={specifications.material}
//             onChange={(e) => handleSpecificationChange("material", e.target.value)}
//             className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="text"
//             placeholder="Weight"
//             value={specifications.weight}
//             onChange={(e) => handleSpecificationChange("weight", e.target.value)}
//             className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
//           />
//         </div>
  
//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Product Images</label>
//           <input
//             type="file"
//             name="images"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-1 block w-full text-sm text-gray-700"
//           />
//         </div>
  
//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
//         >
//           Create Product Detail
//         </button>
//       </form>
//     </div>
//   );
  
// };


import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { axiosInstance } from "../../config/axiosInstance";

export const DetailProductForm = () => {
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    ratings: "",
    returnPolicy: "",
  });

  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([""]);
  const [colors, setColors] = useState([""]);
  const [specifications, setSpecifications] = useState({
    material: "",
    weight: ""
  });

  // Fetch existing product detail data if available
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axiosInstance.get(`/product-detail/detailbyId/${productId}`);
        const data = res.data.data;
        console.log("Fetched detail:", data);


        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          brand: data.brand || "",
          stock: data.stock || "",
          ratings: data.ratings || "",
          returnPolicy: data.returnPolicy || "",
        });

        setSizes(data.sizes || [""]);
        setColors(data.colors || [""]);
        setSpecifications(data.specifications || { material: "", weight: "" });

      } catch (error) {
        console.log("No existing detail found. Ready to create new.");
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddField = (type) => {
    if (type === "sizes") setSizes([...sizes, ""]);
    if (type === "colors") setColors([...colors, ""]);
  };

  const handleSizeChange = (i, value) => {
    const newSizes = [...sizes];
    newSizes[i] = value;
    setSizes(newSizes);
  };

  const handleColorChange = (i, value) => {
    const newColors = [...colors];
    newColors[i] = value;
    setColors(newColors);
  };

  const handleSpecificationChange = (key, value) => {
    setSpecifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    data.append("productId", productId);

    images.forEach((img) => data.append("images", img));
    sizes.forEach((size) => data.append("sizes", size));
    colors.forEach((color) => data.append("colors", color));

    for (const key in specifications) {
      data.append(`specifications[${key}]`, specifications[key]);
    }

    try {
      const res = await axiosInstance.post("product-detail/create_details", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Product details added!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error while uploading");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Product Detail</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        {[
          "name",
          "description",
          "price",
          "category",
          "brand",
          "stock",
          "ratings",
          "returnPolicy"
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sizes</label>
          {sizes.map((size, i) => (
            <input
              key={i}
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(i, e.target.value)}
              placeholder={`Size ${i + 1}`}
              className="mt-1 block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("sizes")}
            className="text-blue-600 text-sm"
          >
            + Add Size
          </button>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Colors</label>
          {colors.map((color, i) => (
            <input
              key={i}
              type="text"
              value={color}
              onChange={(e) => handleColorChange(i, e.target.value)}
              placeholder={`Color ${i + 1}`}
              className="mt-1 block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField("colors")}
            className="text-blue-600 text-sm"
          >
            + Add Color
          </button>
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
          <input
            type="text"
            placeholder="Material"
            value={specifications.material}
            onChange={(e) => handleSpecificationChange("material", e.target.value)}
            className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Weight"
            value={specifications.weight}
            onChange={(e) => handleSpecificationChange("weight", e.target.value)}
            className="block w-full px-3 py-2 mb-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
        >
          Create Product Detail
        </button>
      </form>
    </div>
  );
};
