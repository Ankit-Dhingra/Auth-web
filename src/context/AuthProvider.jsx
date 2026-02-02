import React, { createContext, useEffect, useState, useCallback } from "react";
import { getUser } from "../services/auth.service";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  // "loading" | "authenticated" | "unauthenticated"

  // 🔑 single source of truth
  const refreshUser = useCallback(async () => {
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
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  // run once on app load
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value = {
    user,
    status,
    isAuthenticated: status === "authenticated",
    isVerified: user
      ? user.isEmailVerified && user.isMobileVerified
      : false,
    setUser,       // optional (can remove later)
    setStatus,     // optional
    refreshUser,   // ✅ THIS is what you needed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
