import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Header() {
  const { isAuth, clearToken } = useAuth();
  const handleLogout = async () => {
    await clearToken();
  };

  return (
    <div className="header">
      <div className="tabs">
        <Link to="/" className="tab">
          Home
        </Link>
        {isAuth && (
          <Link to="/users" className="tab">
            Users List
          </Link>
        )}
      </div>
      <div className="auth-buttons">
        {isAuth ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="auth-button">
              Login
            </Link>
            <Link to="/register" className="auth-button">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
