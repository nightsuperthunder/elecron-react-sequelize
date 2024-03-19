import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersList from '../users/UsersList';
import LoginPage from '../login/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../home/HomePage';
import RegisterPage from '../register/RegisterPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/users" element={<UsersList />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default AppRouter;
