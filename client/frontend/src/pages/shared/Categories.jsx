import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductCards } from "../../components/user/Card"; 
import { axiosInstance } from "../../config/axiosInstance";

export const CategoryProducts = () => {
 
    const { category } = useParams();
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      axiosInstance.get(`/product/category/${category}`)
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }, [category]);
  
    return (
      <div className="px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">{category} Products</h2>
  
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCards key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  
  }