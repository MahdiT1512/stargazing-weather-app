import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

function HomePage() {
  const navigate = useNavigate();  // Initialize navigate for navigation

  const handleGetStarted = () => {
    localStorage.setItem("defaultCity", "London"); // Save default city
    navigate("/ForecastPage"); // Navigate to ForecastPage
  };

  return (
    <div className='all-container'> 
        <div className='homepage'>
          <div className='home-container'>
            <h1 className='home-title'>
              Accurate Weather Forecasts for the Perfect Stargazing Experience
            </h1>
            <p className='home-description'>
              Whether you’re an amateur astronomer or an astrophotographer, find the perfect conditions for your observations.
            </p>
            <button className='get-started-btn' onClick={handleGetStarted}>
              Check tonight's sky
            </button>
          </div>
        </div>
    </div>
  );
}

export default HomePage;