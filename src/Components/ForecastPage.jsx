import React, { useState } from 'react';
import Navbar from './Navbar';
import ConditionCard from './ConditionCard';
import ForecastCard from './ForecastCard';
import SearchImg from '../Assets/Search.png';

const ForecastPage = () => {
  const [forecastType, setForecastType] = useState("hourly");
  
  const hourlyForecastData = [
    { time: '10:00 AM', date: 'March 25', temperature: '15°C', windSpeed: '18 km/h', visibility: 'Good' },
    { time: '11:00 AM', date: 'March 25', temperature: '16°C', windSpeed: '22 km/h', visibility: 'Okay' },
    { time: '12:00 PM', date: 'March 25', temperature: '17°C', windSpeed: '25 km/h', visibility: 'Good' },
    { time: '01:00 PM', date: 'March 25', temperature: '18°C', windSpeed: '20 km/h', visibility: 'Okay' },
  ];
  
  const weeklyForecastData = [
    { time: 'Monday', date: 'March 25', temperature: '14°C', windSpeed: '12 km/h', visibility: 'Good' },
    { time: 'Tuesday', date: 'March 26', temperature: '17°C', windSpeed: '28 km/h', visibility: 'Poor' },
    { time: 'Wednesday', date: 'March 27', temperature: '19°C', windSpeed: '15 km/h', visibility: 'Good' },
    { time: 'Thursday', date: 'March 28', temperature: '20°C', windSpeed: '10 km/h', visibility: 'Okay' },
  ];

  const forecastData = forecastType === 'hourly' ? hourlyForecastData : weeklyForecastData;
  
  return (
    <div className="forecast-page">
      {/* -- Top Navigation -- */}
      <Navbar />

      {/* -- Search Bar -- */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Greater London, London" 
          className="location-input"
        />
        <img className='search-img' src={SearchImg} alt="Search" />
      </div>

      {/* -- Stargazing Conditions -- */}
      <section className="stargazing-conditions">
        <h2>Stargazing Conditions</h2>
        <div className="conditions-cards">
          <ConditionCard
            title="Cloud Cover"
            value="5%"
            subtitle="Clear Sky"
            imgNum={0}
          />
          <ConditionCard
            imgNum={1}
            title="Moon Phase"
            value="New Moon"
            subtitle="Minimal Moonlight (Optimal)"
          />
          <ConditionCard
            imgNum={2}
            title="Transparency"
            value="High"
            subtitle="Good for Deep-sky Viewing"
          />
          <ConditionCard
            imgNum={3}
            title="Seeing"
            value="4/5"
            subtitle="Stable Atmosphere (Optimal)"
          />
        </div>
      </section>

      {/* -- Tonight's Conditions -- */}
      <section className="tonights-conditions">
        <h2>Tonight’s Conditions</h2>
        <div className="forecast-tabs">
          <button onClick={() => setForecastType("hourly")}
            className={forecastType === "hourly" ? "active" : ""}>Hourly Forecast</button>
          <button onClick={() => setForecastType("weekly")}
            className={forecastType === "weekly" ? "active" : ""}>Weekly Forecast</button>
        </div>

        <div className="forecast-cards">
          {forecastData.map((forecast, index) => (
            <ForecastCard key={index} {...forecast} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForecastPage;
