import React, { useEffect, useState } from "react";
import {axiosInstance} from "../../config/axiosInstance";
import {ProductCards} from "../../components/user/Card"; // Make sure this has a default export

export const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsWithDetails = async () => {
      try {
        const res = await axiosInstance.get("/product-detail/allproductDetails");
        const data = res.data;

        // Group by category
        const grouped = data.reduce((acc, product) => {
          const category = product.category || "Others";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setProductsByCategory(grouped);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProductsWithDetails();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Shop by Category</h1>

      {Object.keys(productsByCategory).map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-semibold capitalize mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsByCategory[category].map((product) => (
              <ProductCards key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

