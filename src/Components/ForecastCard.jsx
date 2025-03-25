import React from 'react';
import './ForecastPage.css';
const ForecastCard = ({ time, date, temperature, windSpeed, visibility }) => {
  return (
    <div className="forecast-card">
  {/* TIME */}
  <div className="forecast-time">{time}</div>

  {/* DATE */}
  <div className="forecast-date">{date}</div>

  {/* TEMPERATURE */}
  <div className="forecast-temp">{temperature}</div>

  {/* WIND SPEED */}
  <div className="wind-speed-label">Wind Speed</div>
  <div className="wind-speed-value">{windSpeed}</div>

  {/* VISIBILITY */}
  <div className="visibility-label">Visibility</div>
  <div className="visibility-value">{visibility}</div>
</div>
  );
};

export default ForecastCard;