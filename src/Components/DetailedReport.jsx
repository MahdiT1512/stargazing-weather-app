import React from 'react';
import './DetailedReport.css';

const DetailedReport = ({
  temperature,
  visibility,
  moonPhase,
  moonrise,
  moonset,
  dewPoint,
  astroTwilight,
  transparency,
  windSpeed,
  windGusts,
  cloudCover,
  humidity,
  seeing,
  bortleScale,
  date,
  time, // Add time prop
  forecastType, // Add forecastType prop
}) => {
  return (
    <div className="detailed-report">
      <h2>Detailed Report</h2>
      <div className="date-and-time">
        <h3>{date}</h3>
        {forecastType === "hourly" && <h3>{time}</h3>} {/* Show time only for hourly */}
      </div>
      <div className="details">
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Temperature</span>
            <span className="detail-value">{temperature}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{visibility}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Moon Phase</span>
            <span className="detail-value">{moonPhase}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Dew Point</span>
            <span className="detail-value">{dewPoint}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Astro Twilight</span>
            <span className="detail-value">{astroTwilight}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Transparency</span>
            <span className="detail-value">{transparency}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Gusts</span>
            <span className="detail-value">{windGusts}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Cloud Cover</span>
            <span className="detail-value">{cloudCover}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Seeing</span>
            <span className="detail-value">{seeing}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Bortle Scale</span>
            <span className="detail-value">{bortleScale}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;