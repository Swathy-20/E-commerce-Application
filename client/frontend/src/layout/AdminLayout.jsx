import {
  FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaChartBar,
  FaStar, FaMoneyCheckAlt, FaUserTie, FaTags, FaPaintBrush, FaCog
} from "react-icons/fa";
import { Link,NavLink, Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/user/Footer";
import { AdminHeader } from "../components/admin/AdminHeader";
import { CreateProductForm } from "../pages/admin/AddProduct";

const navItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
  { name: "Profile", icon: <FaTachometerAlt />, path: "/admin/profile" },
  {
    name: "Products", icon: <FaBoxOpen />, subItems: [
      { name: "Add product", path: "/admin/add-product" },
      { name: "Product list", path: "/products" },
      { name: "Categories", path: "/admin/categories" },
      { name: "Brands", path: "/admin/brands" }
    ]
  },
  { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
  { name: "Customers", icon: <FaUsers />, path: "/admin/customers" },
  { name: "Statistics", icon: <FaChartBar />, path: "/admin/statistics" },
  { name: "Reviews", icon: <FaStar />, path: "/admin/reviews" },
  { name: "Transactions", icon: <FaMoneyCheckAlt />, badge: 1, path: "/admin/transactions" },
  { name: "Sellers", icon: <FaUserTie />, path: "/admin/sellers" },
  { name: "Settings", icon: <FaCog />, path: "/admin/settings" },
];

export const AdminLayout = () => {
  const location = useLocation();

  return (
    
    
    

      <div className="flex min-h-screen bg-gray-100 text-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4 space-y-4">
          <div className="text-2xl font-bold text-blue-600 mb-4">🔒 Admin</div>
          <nav className="space-y-2">
            <NavLink to="/admin/dashboard" className="block hover:text-blue-600">📊 Dashboard</NavLink>
            <NavLink to="/admin/profile" className="block hover:text-blue-600">👤 Profile</NavLink>
  
            <div className="font-semibold mt-4">Products</div>
            <NavLink to="/admin/add-product" className="block ml-4 hover:text-blue-600">Add product</NavLink>
            <NavLink to="/products" className="block ml-4 hover:text-blue-600">Product list</NavLink>
            <NavLink to="/admin/categories" className="block ml-4 hover:text-blue-600">Categories</NavLink>
            <NavLink to="/admin/brands" className="block ml-4 hover:text-blue-600">Brands</NavLink>
  
            <div className="font-semibold mt-4">🛒 Orders</div>
            <NavLink to="/admin/orders" className="block ml-4 hover:text-blue-600">Orders</NavLink>
  
            <div className="font-semibold mt-4">👥 Customers</div>
            <NavLink to="/admin/customers" className="block ml-4 hover:text-blue-600">Customers</NavLink>
  
            <div className="font-semibold mt-4">📈 Statistics</div>
            <NavLink to="/admin/statistics" className="block ml-4 hover:text-blue-600">Statistics</NavLink>
  
            <div className="font-semibold mt-4">⭐ Reviews</div>
            <NavLink to="/admin/reviews" className="block ml-4 hover:text-blue-600">Reviews</NavLink>
  
            <div className="font-semibold mt-4">💳 Transactions</div>
            <NavLink to="/admin/transactions" className="block ml-4 hover:text-blue-600">Transactions</NavLink>
  
            <div className="font-semibold mt-4">🏬 Sellers</div>
            <NavLink to="/admin/sellers" className="block ml-4 hover:text-blue-600">Sellers</NavLink>
  
            <div className="font-semibold mt-4">⚙️ Settings</div>
            <NavLink to="/admin/settings" className="block ml-4 hover:text-blue-600">Settings</NavLink>
          </nav>
        </aside>
  
        {/* Main content */}
        <main className="flex-grow p-6">
          <Outlet /> {/* Render child routes here */}
        </main>
      </div>
    );
};
