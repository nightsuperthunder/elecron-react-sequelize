import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PrivateRoute() {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={{ pathname: '/login' }} />;
}

export default PrivateRoute;
