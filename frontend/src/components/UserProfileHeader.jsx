// src/components/UserProfileHeader.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfileHeader = ({ userId }) => {
  const [user, setUser] = useState({ name: "Guest", profilePhoto: null });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/member/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg mb-6">
      <img
        src={user.profilePhoto || defaultProfile}
        alt="Profile"
        className="w-14 h-14 rounded-full border-2 border-blue-500"
      />
      <div>
        <h2 className="text-lg font-bold">Hello, {user.name || "Guest"}</h2>
        <p className="text-gray-600">Welcome back!</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
