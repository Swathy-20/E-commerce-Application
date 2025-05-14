// import { useEffect, useState } from 'react';
// import { ProductDelete } from '../../components/admin/ProductDelete';
// import { useFetch } from "../../hooks/useFetch";
// import { ProductCardSkeltons } from '../../components/user/Skeltons';

// export const ProductList = () => {
//   const [fetchedList, isLoading, refetch] = useFetch("/product/productList");
//   const [productList, setProductList] = useState([]);

//   useEffect(() => {
//     if (!isLoading && fetchedList) {
//       setProductList(fetchedList);
//     }
//   }, [fetchedList, isLoading]);

//   const handleDelete = (id) => {
//     setProductList(prev => prev.filter(p => p._id !== id));
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Products</h1>
//         <button
//           onClick={refetch}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Refresh List
//         </button>
//       </div>

//       {isLoading ? (
//         <ProductCardSkeltons />
//       ) : productList.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         productList.map(product => (
//           <ProductDelete key={product._id} product={product} onDelete={handleDelete} />
//         ))
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';

import { axiosInstance } from '../../config/axiosInstance';
import { useFetch } from "../../hooks/useFetch";
import { ProductGrid } from '../../components/admin/ProductGrid';

export const ProductList = () => {
  
  const [products, setProducts] = useState([]);
  const [fetchedList, isLoading, refetch] = useFetch("/product/productList");
  useEffect(() => {
         if (!isLoading && fetchedList) {
          setProducts(fetchedList);
        }
       }, [fetchedList, isLoading])

  

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`/product/delete/${productId}`);
      //await axiosInstance.delete(`/product-detail/delete/${productId}`); // Match to your model
      setProducts(products.filter(p => p._id !== productId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Listing</h1>
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} onDelete={handleDelete} />
      ))}
    </div>
  );
};



