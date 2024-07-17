import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children, redirectTo = '/' }) => {
  if (!isAuthenticated) {
    return < Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
