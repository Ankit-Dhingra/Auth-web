import React, { createContext, useEffect, useState } from "react";
import { getUser } from "../services/auth.service";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  // "loading" | "authenticated" | "unauthenticated"

  useEffect(() => {
    const fetchUser = async () => {
    try {
      const res = await getUser();
      const userData = res?.data?.data;

      if (userData) {
        setUser(userData);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");
      }
    } catch (error) {
      // 401 is NORMAL here
      console.log(error)
      setUser(null);
      setStatus("unauthenticated");
    }
  };
    fetchUser();
  },[]);

  const value = {
    user,
    status,
    isAuthenticated: status === "authenticated",
    isVerified: user ? user.isEmailVerified && user.isMobileVerified : false,
    setUser,
    setStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
