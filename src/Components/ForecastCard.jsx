import React from 'react';
import './ForecastPage.css';
const ForecastCard = ({ time, date, temperature, windSpeed, visibility }) => {
    const match = windSpeed.match(/^(\d+)\s*(\D+)$/); // Extracts number + unit
  const windValue = match ? match[1] : windSpeed; // Number part
  const windUnit = match ? match[2] : ""; // Unit part

  return (
    <div className="forecast-card">
      <h4 className="forecast-time">{time}</h4>
      <p className="forecast-date">{date}</p>
      <p className="forecast-temp">{temperature}</p>
      <p className="forecast-wind">
      <div className="wind-speed-label">Wind Speed</div>
        <span className="wind-speed-value">
          {windValue}<span className="unit">{windUnit}</span>
        </span>
      </p>
      <div className="visibility-label">Visibility</div>
      <div className="visibility-value">{visibility}</div>
    </div>
  );
};

export default ForecastCard;