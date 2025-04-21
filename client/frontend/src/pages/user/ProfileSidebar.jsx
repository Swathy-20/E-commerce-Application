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

export const ProfileSidebar = ({ user,handleMenuClick }) => {
  console.log("handleMenuClick:", handleMenuClick); 
  return (
    <div className="w-72 bg-white p-4 rounded-xl shadow-md text-gray-900">
      <div className="flex flex-col items-center text-center border-b pb-4">
        <img
          src="https://via.placeholder.com/80"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />
        <p className="mt-2 font-semibold">{user?.name || 'Loading...'}</p>
        <p className="text-sm text-gray-500">{user?.email || ''}</p>
      </div>

      <ul className="mt-4 space-y-2">
        <li
          onClick={() => handleMenuClick("profile")}
          className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <span className="material-icons mr-2"></span> My Profile
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
        <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
          <span className="material-icons mr-2"></span> Log Out
        </li>
      </ul>
    </div>
  );
};

