// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../../config/axiosInstance';
// import toast from 'react-hot-toast';


// export const ProductDelete = ({ product, onDelete }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
  

//   const handleDelete = async () => {
//     try {
//       await axiosInstance.delete(`/product/delete/${product._id}`);
//       onDelete(product._id);
//       setDropdownOpen(false);
//       toast.success("Product deleted successfully");
//     } catch (err) {
//       console.error("Error deleting product", err);
//       toast.error("Failed to delete product");
//     }
//   };
  

//   return (
//     <div className="flex justify-between items-center bg-white border rounded-md shadow-sm p-4 mb-3">
//       {/* Product Info */}
//       <div className="flex items-center gap-4">
//         <img
//           src={product.images || "https://via.placeholder.com/300"}
//           alt={product.name}
//           className="w-16 h-16 object-cover rounded"
//         />
//         <div>
//           <h2 className="font-semibold">{product.name}</h2>
//           <p className="text-sm text-green-600">Enabled</p>
//           <p className="text-sm text-gray-500">In stock</p>
//         </div>
//       </div>

//       {/* Price and Dropdown */}
//       <div className="flex items-center gap-4 relative">
//         <span className="font-bold text-lg">${product.price}</span>
//         <button
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//           className="px-3 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200"
//         >
//           Edit Product
//         </button>

//         {dropdownOpen && (
//           <ul className="absolute right-0 top-12 bg-white border rounded shadow-lg w-48 z-10">
//             <li
//               onClick={() => navigate(`/admin/edit-productdetail/${productDetailId}`)}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//             >
//               Edit Product
//             </li>
            
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Images</li>
            
//             <li
//               onClick={async () => {
//     const confirm = window.confirm("Are you sure you want to delete this product?");
//     if (confirm) {
//       await handleDelete();
//     }
//   }}
//               className="px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
//             >
//               Delete Product
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductGrid = ({ product, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="border p-4 rounded relative shadow mb-4 flex justify-between items-center">
      <div>
        <img src={product.images} alt={product.name} className="w-20 h-20 object-cover mb-2" />
        <p className="font-semibold">{product.name}</p>
        <p className="text-sm text-gray-500">In Stock</p>
        <p className="text-blue-600">€{product.price}</p>
      </div>
      <div className="relative">
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          onClick={toggleDropdown}
        >
          Edit Product
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-10">
            <ul className="text-sm">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/admin/edit-productdetail/${product._id}`)}
              >
                Edit Product
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                onClick={() => onDelete(product._id)}
              >
                Delete Product
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};


