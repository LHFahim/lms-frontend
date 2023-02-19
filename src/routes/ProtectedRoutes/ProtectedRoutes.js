import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  // let user1 = localStorage.getItem('user');
  // user1 = JSON.parse(user1);
  // console.log(user1.accessToken);

  if (user.loading) {
    return <p>Loading....</p>;
  }

  const token = localStorage.getItem('access-token');

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoutes;
