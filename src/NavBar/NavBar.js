import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // CSS file for styling

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    setUser(null); // Clear user state
    navigate('/'); // Redirect to login page
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">ProWatches</Link>
      </div>
      <div className="navbar-center">
        <span className="navbar-date">{formattedDate}</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/orderHistory">Order History</Link>
        </li>
        {user ? (
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
