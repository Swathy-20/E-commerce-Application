import { createBrowserRouter } from "react-router-dom";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { GeneralHome } from "../pages/shared/GeneralHome";
import { MainLayout } from "../layout/MainLayout";
//import { Profile } from "../pages/user/Profile";
import { AdminProfile } from "../pages/admin/Profile";
import { ProtectRoutes } from "./ProtectRoutes";
import { ProtectedRoutesAdmin } from "./ProtectedRoutesAdmin";
import { ErrorPage } from "../pages/shared/ErrorPage";
import {Products} from "../pages/user/Products"
import { ProductDetails } from "../pages/user/ProductDetails";
import { LoginPage } from "../pages/shared/LoginPage";
import { AdminLayout } from "../layout/AdminLayout";
import { CartPage } from "../pages/user/CartPage";
import { SignupPage } from "../pages/shared/SignupPage";
import {Wishlist} from "../pages/user/Wishlist";
import { SearchResults } from "../pages/shared/SearchResults";
import { CategoryProducts } from "../pages/shared/Categories";
import { Home } from "../pages/user/Home";
import { CreateProductForm } from "../pages/admin/AddProduct";
import { DetailProductForm } from "../pages/admin/AddProductDetails";
import  {Profile}  from "../components/user/Profile";
import { AdminDashboard } from "../pages/admin/Dashboard";

import { ProductCategories } from "../pages/shared/ProductCategories";
import { Logout } from "../pages/shared/Logout";

export const router = createBrowserRouter([
   
        {
          path: "/",
          element: <MainLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "",
              element: <GeneralHome />,
            },
                
                  {
                    path:"/search", element:<SearchResults />
                  },
                  {
                    path:"/category/:category",
                    element:<CategoryProducts/>
                  },
                
              
            
            {
                path: "/login",
                element: <LoginPage />,
              },
              {
                path: "logout",
                element: <Logout />
              },
               
        {
            path: "/signup",
            element: <SignupPage />,
          },
        
            {
              path: "about",
              element: <About />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
            {
              path: "products",
              element: <ProductCategories />,
            },
            {
              path: "product-detail/detailbyId/:id",
              element: <ProductDetails />,
            },
            {
              path:"/search", element:<SearchResults />
            },
            {
              path:"/category/:category",
              element:<CategoryProducts/>
            },
            {
              path: "user",
              element: <ProtectRoutes />,
              children: [
                { path: "home", element: <Home /> },
                { path: "profile", element: <Profile /> },
                { path: "wishlist", element: <Wishlist /> },
                { path: "cart", element: <CartPage /> },
                { path: "payment", element: <h1>Payment</h1> },
                { path: "payment/success", element: <h1>Payment Success</h1> },
                { path: "payment/cancel", element: <h1>Payment Cancelled</h1> },
               
              ],
            },
          ],
        },
      
      
      
        // Admin routes
        {
            path: "/admin/login",
            element: <LoginPage role="admin" />,
          },
          {
            path: "/admin/signup",
            element: <SignupPage role="admin" />,
          },
          

        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { path: "add-product", element: <CreateProductForm/>},
            { path: "add-product-details", element: <DetailProductForm/>},
            
            
           
            {
              
                element: <ProtectedRoutesAdmin />,
                children:[
                    //profile
                    { path: "profile", element: <AdminProfile /> },
                    { path: "dashboard", element: <AdminDashboard /> },
                    // userlistingpage
                    // product create page
                    
                    // productListing page
                    { path: "product", element: <Products /> },

                    
                ],
            },
          ],
        },
      
      
    
]);