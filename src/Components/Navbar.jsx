import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Logo from '../Assets/NavLogo.svg';
import './Navbar.css';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [activeModal, setActiveModal] = useState(null); // 'login' or 'signup'
  const { userLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className='logo'>
        <img className='logo-image' src={Logo} alt="App Logo" />
        <div className="logo-name">Stargazing Weather App</div>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button className="mobile-menu-icon" onClick={handleMobileMenuToggle}>
        ☰
      </button>

      {/* Nav Links (conditionally shown on mobile) */}
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/HomePage" className={currentPage === 'HomePage' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/ForecastPage" className={currentPage === 'ForecastPage' ? 'active' : ''}>Forecast</Link></li>
        <li><Link to="/EventsPage" className={currentPage === 'EventsPage' ? 'active' : ''}>Events</Link></li>
        <li><Link to="/CommunityPage" className={currentPage === 'CommunityPage' ? 'active' : ''}>Community</Link></li>
      </ul>

      {
        userLoggedIn 
          ? <button className="login-btn" onClick={doSignOut}>Log Out</button>
          : <button className="login-btn" onClick={() => setActiveModal('login')}>Log In</button>
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
