import React, { useState } from 'react';
import Logo from '../Assets/NavLogo.svg';
import './Navbar.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';
const Navbar = ({currentPage, setCurrentPage }) => {
  const [activeModal, setActiveModal] = useState(null); // 'login' or 'signup'
  const {userLoggedIn} = useAuth();
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
      {
        userLoggedIn 
          ?
          <button
            className="login-btn"
            onClick={() => {doSignOut()}} 
          >
            Log Out
          </button>
          :
          <button
            className="login-btn"
            onClick={() => setActiveModal('login')}
          >
            Log In
          </button>
      } 

      {activeModal === 'login' && (
        <LoginModal 
          onClose={() => setActiveModal(null)} 
          switchToSignup={() => setActiveModal('signup')} 
        />
      )}
      {activeModal === 'signup' && (
        <SignupModal 
          onClose={() => setActiveModal(null)} 
          switchToLogin={() => setActiveModal('login')} 
        />
      )}
    </nav>
  );
};

export default Navbar;