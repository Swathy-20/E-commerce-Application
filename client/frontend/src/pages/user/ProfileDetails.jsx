import React from 'react';
import { useFetch } from '../../hooks/useFetch';

export const ProfileDetails = () => {
  const [userDetails, isLoading] = useFetch("/user/profile");

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading profile details...</div>;
  }

  if (!userDetails) {
    return <div className="p-6 text-red-500">Error loading profile details.</div>;
  }

  return (
    <div className="bg-cyan-500
 p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto h-full text-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
      <img
           src={userDetails?.profilePic || "https://via.placeholder.com/300"}
           alt="profile"
           className="w-20 h-20 rounded-full" />
        <div>
          <p className="font-semibold">Name:</p>
          <p>{userDetails.name}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{userDetails.email}</p>
        </div>
        <div>
          <p className="font-semibold">Mobile:</p>
          <p>{userDetails.mobile}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{userDetails.isActive ? "Active" : "Inactive"}</p>
        </div>
        <div>
          <p className="font-semibold">Member Since:</p>
          <p>{new Date(userDetails.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};
