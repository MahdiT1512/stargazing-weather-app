import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Stargazing Weather App</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/forecast">Forecast</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/community">Community</a></li>
      </ul>
      <button className="login-btn">Log In</button>
    </nav>
  );
};

export default Navbar;