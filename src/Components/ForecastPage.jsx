import React from 'react';
import Navbar from './Navbar';
import ConditionCard from './ConditionCard';
import ForecastCard from './ForecastCard';

const ForecastPage = () => {
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
      </div>

      {/* -- Stargazing Conditions -- */}
      <section className="stargazing-conditions">
        <h2>Stargazing Conditions</h2>
        <div className="conditions-cards">
          <ConditionCard
            title="Cloud Cover"
            value="5%"
            subtitle="Clear Sky"
            iconSrc="../Assets/Haze.png" 
          />
          <ConditionCard
            iconSrc="../Assets/Icon.png"
            title="Moon Phase"
            value="New Moon"
            subtitle="Minimal Moonlight (Optimal)"
          />
          <ConditionCard
            iconSrc="/Assets/Haze.png"
            title="Transparency"
            value="High"
            subtitle="Good for Deep-sky Viewing"
          />
          <ConditionCard
            imgSrc="../Assets/Icon.png"
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
          <button>Hourly Forecast</button>
          <button>Weekly Forecast</button>
        </div>

        <div className="forecast-cards">
          <ForecastCard
            weatherIcon="/images/weather-icon.png"
            time="8PM"
            date="17/02/2025"
            temperature="12°C"
            windSpeed="10 km/h"
            visibility="Good"
          />
          <ForecastCard
            weatherIcon="/images/weather-icon.png"
            time="9PM"
            date="17/02/2025"
            temperature="11°C"
            windSpeed="15 km/h"
            visibility="Okay"
          />
          <ForecastCard
            weatherIcon="/images/weather-icon.png"
            time="10PM"
            date="17/02/2025"
            temperature="11°C"
            windSpeed="16 km/h"
            visibility="Okay"
          />
          <ForecastCard
            weatherIcon="/images/weather-icon.png"
            time="11PM"
            date="17/02/2025"
            temperature="10°C"
            windSpeed="30 km/h"
            visibility="Poor"
          />
        </div>
      </section>
    </div>
  );
};

export default ForecastPage;
