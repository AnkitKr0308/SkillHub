import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const authenticated = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);

  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (authenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
