import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoggedInLayout = () => {
  const { status, isVerified } = useAuth();

  if (status === "loading") {
    return null; // or loader
  }

  if (status === "authenticated") {
    return isVerified ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/verification" replace />
    );
  }

  return <Outlet />;
};

export default LoggedInLayout;
