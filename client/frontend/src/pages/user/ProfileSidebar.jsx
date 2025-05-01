// import React,{ useState }  from "react";
// import { useFetch } from "../../hooks/useFetch";

// export const Profile = () => {

//   const [userDetails,isLoading]=useFetch("/user/profile")
//   // console.log(userDetails,"=======userDetails");
//   const [showOrders, setShowOrders] = useState(false);
  
//   return( 

//   <div>
//             <div className="flex gap-5">
//                 <button className="btn btn-primary">Edit profile</button>
//                 <button className="btn btn-accent" onClick={() => setShowOrders(!showOrders)}>
//                     Orders
//                 </button>
//                 <button className="btn btn-info">Change password </button>
//                 <button className="btn btn-neutral">Logout </button>
//             </div>
//             <div>
//                 <h1>Welcome {userDetails?.name} </h1>
//                 <p>Email ID : {userDetails?.email} </p>
//                 <p>Mobile : {userDetails?.mobile} </p>
                
//             </div>

//             {showOrders && <p>This is user orders</p>}
//         </div> 
// )
// };

import React from 'react';
import { useFetch } from "../../hooks/useFetch";
import { NavLink, useNavigate } from "react-router-dom";
//import { Logout } from '../shared/Logout';


 export const ProfileSidebar = ({ handleMenuClick }) =>  {
  const navigate = useNavigate();
  const [userDetails,isLoading]=useFetch("/user/profile")
  //const [showOrders, setShowOrders] = useState(false);
  const handleLogoutClick = () => {
    navigate('/logout', {
      state: {
        email: userDetails?.email,
        role: "user"
      }
    });
  };
   return (
     <div className="w-68 h-full bg-white p-4 rounded-xl shadow-md text-gray-900">
       <div className="flex flex-col items-center text-center border-b pb-4">
         <img
           src={userDetails?.profilePic || "https://via.placeholder.com/300"}
           alt="profile"
           className="w-20 h-20 rounded-full" />
         <div>
           <h1>{userDetails?.name} </h1>
           <p>{userDetails?.email} </p>
           

         </div>
       </div>

       <ul className="mt-4 space-y-2">
         <li
           onClick={() => handleMenuClick("profile")}
           className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
         >
           <span className="material-icons mr-2"></span> My Profile
         </li>
         <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
           <span className="material-icons mr-2"></span> Checkout
         </li>
         <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
           <span className="material-icons mr-2"></span> Settings
         </li>
         <li className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded">
           <span className="flex items-center">
             <span className="material-icons mr-2"></span> Notification
           </span>
           <select className="text-sm">
             <option>Allow</option>
             <option>Mute</option>
           </select>
         </li>
         <li onClick={handleLogoutClick}  className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
          <span className="material-icons mr-2"></span> Log Out
          
        </li>
       </ul>
     </div>
   );
 };
