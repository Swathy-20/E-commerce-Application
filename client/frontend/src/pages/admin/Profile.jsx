import React,{ useState }  from "react";
import { useFetch } from "../../hooks/useFetch";
import { AdminLayout } from "../../layout/AdminLayout";

export const AdminProfile = () => {

  const [adminDetails,isLoading]=useFetch("/admin/profile")
  
  
  return( 

  <div>
           <AdminLayout/>
           {!isLoading && (
            <pre>{JSON.stringify(adminDetails,null,2)}</pre>
           )}
           

           
        </div> 
)
};