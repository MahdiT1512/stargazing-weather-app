import React from 'react';
import './DetailedReport.css';

const DetailedReport = ({
  temperature,
  visibility,
  moonPhase,
  moonrise,
  moonset,
  dewPoint = "N/A", // Set default to "N/A"
  astroTwilight = "N/A", // Set default to "N/A"
  windSpeed,
  windGusts,
  cloudCover,
  humidity,
  seeing,
  date,
  time, // Add time prop
  forecastType, // Add forecastType prop
}) => {
  const getVisibilityColor = (seeing) => {
    const numeric = parseInt(seeing);
    if (isNaN(numeric)) return "#C0C0C0"; // fallback for invalid values
    if (numeric >= 4) return "#32CD32"; // Green for good seeing
    if (numeric >= 2) return "#FFD700"; // Yellow for average seeing
    return "#FF4F4F"; // Red for poor seeing
  };

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
            <span className="detail-value">{temperature || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{visibility || "N/A"}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Moon Phase</span>
            <span className="detail-value">{moonPhase || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Dew Point</span>
            <span className="detail-value">{dewPoint}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Seeing</span>
            <span className="detail-value">{seeing || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Astro Twilight</span>
            <span className="detail-value">{astroTwilight}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Gusts</span>
            <span className="detail-value">{windGusts || "N/A"}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Cloud Cover</span>
            <span className="detail-value">{cloudCover || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity || "N/A"}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
            <span className="detail-label">Moonrise</span>
            <span className="detail-value">{moonrise || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Moonset</span>
            <span className="detail-value">{moonset || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;