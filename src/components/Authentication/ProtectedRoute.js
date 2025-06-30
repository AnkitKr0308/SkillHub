import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const authenticated = useSelector((state) => state.auth.status);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.data?.user);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (authenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
