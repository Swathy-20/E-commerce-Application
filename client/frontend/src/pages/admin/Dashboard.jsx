import React, { useEffect, useState } from 'react';
import {axiosInstance } from "../../config/axiosInstance"

export const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalOrders: 0,
    totalRevenue: 0,
    // highestSaleProduct: {},
    outOfStockProducts: [],
    lowStockProducts: [],
    bestSellerCategory: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/admin/dashboard'); 
        setDashboardData(response.data);
        //console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dashboard data.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl">{dashboardData.totalProducts}</p>
        </div>
        {/* <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Stock</h2>
          <p className="text-2xl">{dashboardData.totalStock}</p>
        </div>
        <div className="bg-yellow-400 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl">{dashboardData.totalOrders}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl">₹{dashboardData.totalRevenue}</p>
        </div> */}
      </div>

      {/* Second row */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Out of Stock Products</h2>
          {dashboardData.outOfStockProducts.length > 0 ? (
            dashboardData.outOfStockProducts.map((product, index) => (
              <p key={index}>
                {product.name} ({product.category})
              </p>
            ))
          ) : (
            <p>None</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Highest Sale Product</h2>
          {dashboardData.highestSaleProduct ? (
            <>
              <p><strong>Name:</strong> {dashboardData.highestSaleProduct.name}</p>
              <p><strong>Category:</strong> {dashboardData.highestSaleProduct.category}</p>
              <p><strong>Total Units Sold:</strong> {dashboardData.highestSaleProduct.unitsSold}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      {/* Third row */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Low Stock Alert</h2>
          {dashboardData.lowStockProducts.length > 0 ? (
            dashboardData.lowStockProducts.map((product, index) => (
              <p key={index}>
                {product.name} - Only {product.stock} left
              </p>
            ))
          ) : (
            <p>No low stock products</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Best Seller Category</h2>
          <p>{dashboardData.bestSellerCategory || "No data available"}</p>
        </div>
      </div>  */}
    </div>
  );
};
