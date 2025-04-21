import React, { useState } from 'react';
import { ProfileSidebar } from '../../pages/user/ProfileSidebar';
import { ProfileDetails } from '../../pages/user/ProfileDetails';
import { axiosInstance } from '../../config/axiosInstance';




 export const Profile = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      // Fetch user profile
      axiosInstance.get('/user/profile')
        .then(res => setUserData(res.data))
        .catch(err => console.error("Error fetching profile:", err));
    }, []);
    
    const handleMenuClick = (menuItem) => {
        console.log("Menu clicked:", menuItem);

        setSelectedMenu(menuItem);
        if (window.innerWidth < 768) setSidebarOpen(false); // for mobile
      };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
        <button
          className="md:hidden p-4 text-blue-600"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button>
  
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-72 bg-white p-4 shadow-md`}>
          <ProfileSidebar user={userData} handleMenuClick={handleMenuClick} />
        </div>
  
        <div className="flex-grow p-4">
          {selectedMenu === "profile" && <ProfileDetails user={userData} />}
          {!selectedMenu && (
            <div className="text-gray-500 text-center mt-10">
              Select an option from the sidebar.
            </div>
          )}
        </div>
      </div>
    );
  };
  