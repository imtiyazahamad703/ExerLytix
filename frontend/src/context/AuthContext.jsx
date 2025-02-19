import { createContext, useContext, useState, useEffect } from "react";

// Create the Auth context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {

  // ✅ Initial state
  const [profile, setProfile] = useState(() => {
    // Load from localStorage (if user already logged in)
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          userId: null,
          name: "Guest",
          email: "",
          profilePicture: null,
        };
  });

  // ✅ Sync localStorage whenever profile changes
  useEffect(() => {
    if (profile && profile.userId) {
      localStorage.setItem("user", JSON.stringify(profile));
    } else {
      localStorage.removeItem("user");
    }
  }, [profile]);

  // ✅ Handler functions to update parts of profile
  const updateProfile = (newData) => {
    setProfile((prev) => ({ ...prev, ...newData }));
  };

  const clearProfile = () => {
    setProfile({
      userId: null,
      name: "Guest",
      email: "",
      profilePicture: null,
    });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy use
export const useAuth = () => useContext(AuthContext);
