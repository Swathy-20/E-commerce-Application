import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import toast from "react-hot-toast";

export const LoginPage = ({ role }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = {
    role: "user",
    loginAPI: "/user/login",
    profileRoute: "/user/profile",
    signupRoute: "/signup",
  };

  if (role === "admin") {
    user.role = "admin";
    user.loginAPI = "/admin/login";
    user.profileRoute = "/admin/profile";
    user.signupRoute = "/admin/signup";
  }

  const onSubmit = async (data) => {
    const loginData = {
      ...data,
      role: user.role, // 👈 include role
    };
    // console.log("Sending login data:", loginData);
    // console.log("Redirecting to:", user.profileRoute);

    


    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.loginAPI,
        data: loginData,
      });
      dispatch(saveUser(response?.data?.data));
      toast.success("Login success");
      navigate(user.profileRoute);
    } catch (error) {
      dispatch(clearUser());
      toast.error("Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      

      {/* Main section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-5xl flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
          {/* Left side image */}
          <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-8">
            <img
              src="https://fivedottwelve.com/wp-content/uploads/2022/06/84_ecommerce_2.png"
              alt="Mobile shopping"
              className="w-full max-w-xl md:max-w-md"
            />
          </div>

          {/* Right side form */}
          <div className="w-full lg:w-1/2 p-10">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Log in</h2>
            <p className="text-sm text-gray-500 mb-6">Enter your details below</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="email"
                placeholder="Email or Phone Number"
                {...register("email")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                required
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                required
              />
              {/* Remove Confirm Password for login */}
              <div className="flex justify-between text-sm mt-1">
                <Link to="#" className="text-red-500 hover:underline">
                  Forgot Password?
                </Link>
                <Link to={user.signupRoute} className="text-red-500 hover:underline">
                  New User?
                </Link>
              </div>
              <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>

      
     
    </div>
  );
};
