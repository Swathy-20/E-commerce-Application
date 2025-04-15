import React,{ useState }  from "react";
import { useFetch } from "../../hooks/useFetch";
import { AdminLayout } from "../../layout/AdminLayout";

export const AdminProfile = () => {

  const [adminDetails,isLoading]=useFetch("/admin/profile")
  // console.log(userDetails,"=======userDetails");
  //const [showOrders, setShowOrders] = useState(false);
  
  return( 

  <div>
           <AdminLayout/>
           

           
        </div> 
)
};