import React, { useState } from 'react';
import Logo from '../Assets/NavLogo.svg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

const Navbar = () => {
  const [activeModal, setActiveModal] = useState(null); // 'login' or 'signup'
  const {userLoggedIn} = useAuth();

  return (
    <nav className="navbar">
      <div className='logo'>
        <img className='logo-image' src={Logo} alt="App Logo" />
        <div className="logo-name">Stargazing Weather App</div>
      </div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/ForecastPage">Forecast</a></li>
        <li><a href="/events">Events</a></li>
        <li><a href="/community">Community</a></li>
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