import { createBrowserRouter } from "react-router-dom";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Home } from "../pages/user/Home";
//import { RootLayout } from "../layout/RootLayout";
import { MainLayout } from "../layout/MainLayout";
import { Profile } from "../pages/user/Profile";
import { ProtectRoutes } from "./ProtectRoutes";
import { ErrorPage } from "../pages/shared/ErrorPage";
import {Products} from "../pages/user/Products"
import { ProductDetails } from "../pages/user/ProductDetails";
import { LoginPage } from "../pages/shared/LoginPage";
import { AdminLayout } from "../layout/AdminLayout";
import { CartPage } from "../pages/user/CartPage";

export const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
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
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <h1>Signup</h1>,
            },
            {
                path: "products",
                element: <Products/>,
            },
            {
                path: "/product-detail/detailbyId/:id",
                element:<ProductDetails/>
            },
            {
                path:"user",
                element: <ProtectRoutes />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "cart",
                        element: <CartPage/>,
                    },
                    {
                        path: "payment",
                        element: <h1>payment</h1>,
                    },
                    {
                        path: "payment/success",
                        element: <h1>Payment success </h1>,
                    },
                    {
                        path: "payment/cancel",
                        element: <h1>Payment Cancelled </h1>,
                    },
                
                ],
            },
        ],
    },
    {
        path: "Admin",
        element: <AdminLayout />,
        children: [
            {
                path: "login",
                element: <LoginPage role="admin" />,
            },
            {
                path: "signup",
            },
        ],
    },
]);