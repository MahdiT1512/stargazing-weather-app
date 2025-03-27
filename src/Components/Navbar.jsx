import React from 'react';
import Logo from '../Assets/NavLogo.svg';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className='logo'>
        <img className = 'logo-image' src={Logo} alt="Stargazing Weather App Logo" />
      <div className="logo-name">Stargazing Weather App</div>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/ForecastPage">Forecast</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/community">Community</a></li>
      </ul>
      <button className="login-btn">Log In</button>
    </nav>
  );
};

export default Navbar;