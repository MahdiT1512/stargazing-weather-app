import React from 'react';
import './ForecastPage.css';

const getWindSpeedColor = (speed) => {
    if (speed > 25) return "#FF4F4F"; // Red
    if (speed > 14) return "#FFD700"; // Yellow
    return "#32CD32";
}

const getVisibilityColor = (seeing) => {
    const numeric = parseInt(seeing);
    if (isNaN(numeric)) return "#C0C0C0"; // fallback for invalid values
    if (numeric >= 4) return "#32CD32"; // Green for good seeing
    if (numeric >= 2) return "#FFD700"; // Yellow for average seeing
    return "#FF4F4F"; // Red for poor seeing
};

const ForecastCard = ({ time, date, temperature, windSpeed, seeing }) => {
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
            <div className="visibility-label">Seeing</div>
            <div className="visibility-value" style={{color : getVisibilityColor(seeing)}}>{seeing}</div>
        </div>
    );
};

export default ForecastCard;