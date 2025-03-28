import React from 'react';
import Logo from '../Assets/NavLogo.svg';
import './Navbar.css';
const Navbar = ({currentPage, setCurrentPage }) => {
    const getActivePage = (page) => {
        return currentPage === page ? 'active' : '';
        }
    return (
    <nav className="navbar">
      <div className='logo'>
        <img className = 'logo-image' src={Logo} alt="Stargazing Weather App Logo" />
      <div className="logo-name">Stargazing Weather App</div>
      </div>
      <ul className="nav-links">
        <li><a className = {getActivePage('home')}href="#" onClick={() => setCurrentPage('home')}>Home</a></li>
        <li><a className = {getActivePage('forecast')} href="#" onClick={() => setCurrentPage('forecast')}>Forecast</a></li>
        <li><a className = {getActivePage('events')}href="#" onClick={() => setCurrentPage('events')}>Events</a></li>
        <li><a className = {getActivePage('community')} href="#" onClick={() => setCurrentPage('community')}>Community</a></li>
      </ul>
      <button className="login-btn">Log In</button>
    </nav>
  );
};

export default Navbar;