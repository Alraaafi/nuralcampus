import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;