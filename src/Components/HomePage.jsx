import React from 'react';
import ForecastPage from './ForecastPage';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

function HomePage() {
  const navigate = useNavigate();  // Initialize navigate for navigation

  const [isForecastPage, setIsForecastPage] = React.useState(false);
  const [defaultCity, setDefaultCity] = React.useState(''); 

  const handleGetStarted = () => {
    localStorage.setItem("defaultCity", "London"); // Save default city
    navigate("/ForecastPage"); // Pass "London" as default
    //setIsForecastPage(true);
    //setDefaultCity('London'); 
  };

  return (
    <div className='all-container'> 
      {!isForecastPage ? (
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
      ) : (
        <ForecastPage initialCity ={defaultCity} /> 
      )}
    </div>
  );
}

export default HomePage;