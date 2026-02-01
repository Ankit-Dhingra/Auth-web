import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const RequireVerification = () => {
  const { status, isVerified } = useAuth();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (status === "authenticated" && !isVerified) {
    return <Navigate to="/verification" replace />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RequireVerification;
