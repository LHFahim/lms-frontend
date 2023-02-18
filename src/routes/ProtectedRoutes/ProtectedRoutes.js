import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);

  console.log('🚀 ~ file: ProtectedRoutes.js:8 ~ ProtectedRoutes ~ user', user);
  const location = useLocation();

  if (user.loading) {
    return <p>Loading....</p>;
  }

  if (!user.user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoutes;
