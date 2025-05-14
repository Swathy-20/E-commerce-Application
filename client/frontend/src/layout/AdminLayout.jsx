import { Link,NavLink, Outlet, useLocation } from "react-router-dom";
import { AdminHeader } from "../components/admin/AdminHeader";
// import { Footer } from "../components/user/Footer";


const navItems = [
  { name: "Dashboard",  path: "/admin/dashboard" },
  { name: "Profile",  path: "/admin/profile" },
  {
    name: "Products", subItems: [
      { name: "Add product", path: "/admin/add-product" },
      { name: "Add product details", path: "/admin/add-product-details" },
      { name: "Product list", path: "/products" },
      // { name: "Delete Product", path: "/admin/delete" },

      { name: "Categories", path: "/admin/categories" },
      { name: "Brands", path: "/admin/brands" }
     

    ]
  },
  { name: "Orders", path: "/admin/orders" },
  { name: "Customers",  path: "/admin/customers" },
  { name: "Statistics",  path: "/admin/statistics" },
  { name: "Reviews",  path: "/admin/reviews" },
  { name: "Transactions",   path: "/admin/transactions" },
  { name: "Sellers",  path: "/admin/sellers" },
  { name: "Settings",  path: "/admin/settings" },
];

export const AdminLayout = () => {
  const location = useLocation();

  return (
    <div>
    <AdminHeader/>
    
    

      <div className="flex min-h-screen bg-gray-100 text-gray-900">
      
      
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 space-y-4">
          <div className="text-2xl font-bold text-blue-600 mb-4">🔒 Admin</div>
          <nav className="space-y-2">
            <NavLink to="/admin/dashboard"  className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>📊 Dashboard</NavLink>
            <NavLink to="/admin/profile" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>👤 Profile</NavLink>
  
            <div className="font-semibold mt-4">Products</div>
            <NavLink to="/admin/add-product" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Add product</NavLink>
            <NavLink to="/admin/add-product-details" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Add product details</NavLink>

            <NavLink to="/products" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Product list</NavLink>
    {/* <NavLink to="/admin/delete" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Delete Product</NavLink> */}
            <NavLink to="/admin/categories" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Categories</NavLink>
            <NavLink to="/admin/brands" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Brands</NavLink>
  
            <div className="font-semibold mt-4">🛒 Orders</div>
            <NavLink to="/admin/orders" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Orders</NavLink>
  
            <div className="font-semibold mt-4">👥 Customers</div>
            <NavLink to="/admin/customers" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Customers</NavLink>
  
            <div className="font-semibold mt-4">📈 Statistics</div>
            <NavLink to="/admin/statistics" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Statistics</NavLink>
  
            <div className="font-semibold mt-4">⭐ Reviews</div>
            <NavLink to="/admin/reviews" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Reviews</NavLink>
  
            <div className="font-semibold mt-4">💳 Transactions</div>
            <NavLink to="/admin/transactions" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Transactions</NavLink>
  
            <div className="font-semibold mt-4">🏬 Sellers</div>
            <NavLink to="/admin/sellers" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Sellers</NavLink>
  
            <div className="font-semibold mt-4">⚙️ Settings</div>
            <NavLink to="/admin/settings" className={({ isActive }) =>
    `flex items-center p-2 rounded-lg transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
    }`}>Settings</NavLink>
          </nav>
        </aside>
  
        {/* Main content */}
        <main className="flex-grow p-6">
          <Outlet /> 
        </main>
      </div></div>
    );
};
