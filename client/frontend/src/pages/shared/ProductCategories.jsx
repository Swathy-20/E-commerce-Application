import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCards } from "../../components/user/Card";

export const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({}); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Fetch all categories
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryRes = await axiosInstance.get("/product-detail/categories"); // GET all category names
        const fetchedCategories = categoryRes.data; 

        setCategories(fetchedCategories);

        // Step 2: Fetch products for each category
        const productFetches = fetchedCategories.map(category => 
          axiosInstance.get(`/product/category/${category}`)
            .then(res => ({ category, products: res.data }))
        );

        const productsData = await Promise.all(productFetches);

        const newCategoryProducts = {};
        productsData.forEach(({ category, products }) => {
          newCategoryProducts[category] = products;
        });

        setCategoryProducts(newCategoryProducts);
      } catch (err) {
        console.error("Failed fetching categories or products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  if (loading) return <p>Loading categories and products...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
    <div className="p-6 text-gray-800">
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          {categoryProducts[category]?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts[category].map((product) => (
                <ProductCards key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      ))}
    </div></div>
  );
};
