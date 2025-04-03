import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Logo from '../Assets/NavLogo.svg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../firebase/auth';

const Navbar = () => {
  const [activeModal, setActiveModal] = useState(null); // 'login' or 'signup'
  const {userLoggedIn} = useAuth(); // Check if user is logged in

  return (
  <nav className="navbar">
    <div className='logo'>
      <img className='logo-image' src={Logo} alt="App Logo" />
      <div className="logo-name">Stargazing Weather App</div>
    </div>
    <ul className="nav-links">
      <li><Link to="/HomePage">Home</Link></li>
      <li><Link to="/ForecastPage">Forecast</Link></li>
      <li><Link to="/EventsPage">Events</Link></li>
      <li><Link to="/CommunityPage">Community</Link></li>
    </ul>
    {
      userLoggedIn 
        ?
        <button className="login-btn" onClick={doSignOut}>
          Log Out
        </button>
        :
        <button className="login-btn" onClick={() => setActiveModal('login')}>
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
