import React from 'react';
import './ForecastPage.css';

const getWindSpeedColor = (speed) => {
    if (speed > 16) return "#FF4F4F"; // Red
    if (speed > 9) return "#FFD700"; // Yellow
    return "#32CD32";
}

const getVisibilityColor = (visibility) => {
    if (visibility === 'Poor') return "#FF4F4F"; // Red
    if (visibility === 'Okay') return "#FFD700"; // Yellow
    return "#32CD32";
}
const ForecastCard = ({ time, date, temperature, windSpeed, visibility }) => {
    const match = windSpeed.match(/^(\d+)\s*(\D+)$/); 
  const windValue = match ? match[1] : windSpeed; 
  const windUnit = match ? match[2] : "";

  return (
    <div className="forecast-card">
      <h4 className="forecast-time">{time}</h4>
      <p className="forecast-date">{date}</p>
      <p className="forecast-temp">{temperature}</p>
      <p className="forecast-wind">
      <div className="wind-speed-label">Wind Speed</div>
        <span className="wind-speed-value" style = {{color : getWindSpeedColor(windValue)}}>
          {windValue}<span className="unit">{windUnit}</span>
        </span>
      </p>
      <div className="visibility-label">Visibility</div>
      <div className="visibility-value" style={{color : getVisibilityColor(visibility)}}>{visibility}</div>
    </div>
  );
};

export default ForecastCard;