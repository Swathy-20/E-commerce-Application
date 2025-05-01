// import React from "react";
// import { useForm } from "react-hook-form";
// import { axiosInstance } from "../../config/axiosInstance";

// import { useDispatch } from "react-redux";
// import { clearUser, saveUser } from "../../redux/features/userSlice";

// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

//   export const LoginPage = ({ role }) => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
  

//   const user = {
//     role: "user",
//     loginAPI: "/user/login",
//     profileRoute: "/user/profile",
//     signupRoute: "/signup",
//   };

//   if (role === "admin") {
//     user.role = "admin";
//     user.loginAPI = "/admin/login";
//     user.profileRoute = "/admin/profile";
//     user.signupRoute = "/admin/signup";
//   }
//   const currentUser = useSelector((state) => state.user);

// if (currentUser?.isUserAuth) {
//   return <Navigate to={user.profileRoute} />;
// }

//   const onSubmit = async (data) => {
  
//     const loginData = {
//       ...data,
//       role: user.role, 
//     };
//     // console.log("Sending login data:", loginData);
//     // console.log("Redirecting to:", user.profileRoute);

    


//     try {
//       const response = await axiosInstance({
//         method: "PUT",
//         url: user.loginAPI,
//         data: loginData,
//         withCredentials:true,
//       });
//       dispatch(saveUser(response?.data?.data));
//       toast.success("Login success");
//       navigate(user.profileRoute);
//     } catch (error) {
//       dispatch(clearUser());
//       toast.error("Login Failed");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-white">
      

//       {/* Main section */}
//       <main className="flex-1 flex items-center justify-center px-4 py-12">
//         <div className="flex w-full max-w-5xl flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
//           {/* Left side image */}
//           <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center p-8">
//             <img
//               src="https://fivedottwelve.com/wp-content/uploads/2022/06/84_ecommerce_2.png"
//               alt="Mobile shopping"
//               className="w-full max-w-xl md:max-w-md"
//             />
//           </div>

//           {/* Right side form */}
//           <div className="w-full lg:w-1/2 p-10">
//             <h2 className="text-2xl font-semibold mb-2 text-gray-800">Log in</h2>
//             <p className="text-sm text-gray-500 mb-6">Enter your details below</p>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <input
//                 type="email"
//                 placeholder="Email or Phone Number"
//                 {...register("email")}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 {...register("password")}
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
//                 required
//               />
//               {/* Remove Confirm Password for login */}
//               <div className="flex justify-between text-sm mt-1">
//                 <Link to="#" className="text-red-500 hover:underline">
//                   Forgot Password?
//                 </Link>
//                 <Link to={user.signupRoute} className="text-red-500 hover:underline">
//                   New User?
//                 </Link>
//               </div>
//               <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>

      
     
//     </div>
//   );
// };
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, saveUser } from "../../redux/features/userSlice";
import { useState } from 'react';
import {axiosInstance} from "../../config/axiosInstance"

export const LoginPage=()=> {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // default role
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiEndpoint =
        formData.role === 'user'
          ? '/user/login'
          : '/admin/login';

      const res = await axiosInstance.post(apiEndpoint, formData, {
        withCredentials: true,
      });
      dispatch(saveUser({
        ...res.data.data,  // must contain role
        role: formData.role, 
      }));
            toast.success("Login success");
      //dispatch(isUserAuth(true));
      
      
      if (formData.role === 'user') {
        navigate('/user/profile');
      } else if (formData.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (formData.role === 'seller') {
        navigate('/seller/profile');
      }
      

      setMessage(res.data.message);
      // console.log('Login successful:', res.data.data);
      //console.log('Login role:', formData.role);
     //console.log('Login response:', res.data);

    } catch (err) {
      console.log("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-5xl flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
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
    
                <form onSubmit={handleSubmit} className="space-y-4">
                 

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                    required
                  />
                  <br/>

                  <label className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700">Login as:</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 text-gray-700">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                  </select>

                  <div className="flex justify-between text-sm mt-1">
                  <Link to="/forgot-password" className="text-slate-500 hover:underline">Forgot Password?</Link>
                  <Link to="/signup" className="text-slate-500 hover:underline">New User?</Link>
              </div>
              <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-md">
                Login
              </button>
              
                  {/* {error && <p style={{ color: 'red' }}>{error}</p>}
                  {message && <p style={{ color: 'green' }}>{message}</p>} */}
                </form>
    </div></div></main></div>
  );

}

