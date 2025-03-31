import React,{ useState }  from "react";
import { useFetch } from "../../hooks/useFetch";

export const Profile = () => {

  const [userDetails,isLoading]=useFetch("/user/profile")
  // console.log(userDetails,"=======userDetails");
  const [showOrders, setShowOrders] = useState(false);
  
  return( 

  <div>
            <div className="flex gap-5">
                <button className="btn btn-primary">Edit profile</button>
                <button className="btn btn-accent" onClick={() => setShowOrders(!showOrders)}>
                    Orders
                </button>
                <button className="btn btn-info">Change password </button>
                <button className="btn btn-neutral">Logout </button>
            </div>
            <div>
                <h1>Welcome {userDetails?.name} </h1>
                <p>Email ID : {userDetails?.email} </p>
                <p>Mobile : {userDetails?.mobile} </p>
                <img src={userDetails?.profiePic} alt="profile pic" className="w-12 h-12" />
            </div>

            {showOrders && <p>This is user orders</p>}
        </div> 
)
};