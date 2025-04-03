import React from 'react';

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
      <p className="hover-info" style={{ textAlign: "center" }}><em>Hover over each label to learn how it impacts stargazing.</em></p>
      <div className="date-and-time">
        <h3>{date}</h3>
        {forecastType === "hourly" && <h3>{time}</h3>} {/* Show time only for hourly */}
      </div>
      <div className="details">
        <div className="dr-row">
          <div className="detail-item">
          <div className="detail-label" title="The current air temperature. Cooler temperatures can mean clearer skies.">
            Temperature
          </div>
            <span className="detail-value">{temperature || "N/A"}</span>
          </div>
          <div className="detail-item">
          <div className="detail-label" title="Distance you can clearly see. Poor visibility reduces stargazing clarity.">
            Visibility
          </div>
            <span className="detail-value">{visibility || "N/A"}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
          <div className="detail-label" title="The current illumination of the moon. Less moonlight is better for stargazing.">
            Moon Phase
          </div>
            <span className="detail-value">{moonPhase || "N/A"}</span>
          </div>
          <div className="detail-item">
          <div className="detail-label" title="Temperature at which dew forms. Close to air temp = more moisture.">
            Dew Point
          </div>
            <span className="detail-value">{dewPoint}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
          <div className="detail-label" title="Measures atmospheric stability. Higher = clearer star images.">
            Seeing
          </div>
            <span className="detail-value">{seeing || "N/A"}</span>
          </div>
          <div className="detail-item">
          <div className="detail-label" title="Time when sky is dark enough for astronomy. Begins after sunset.">
            Astro Twilight
          </div>
            <span className="detail-value">{astroTwilight}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
          <div className="detail-label" title="High wind can cause unstable atmosphere = poor seeing.">
            Wind Speed
          </div>
            <span className="detail-value">{windSpeed || "N/A"}</span>
          </div>
          <div className="detail-item">
          <div className="detail-label" title="Sudden strong winds. Can worsen seeing conditions.">
            Wind Gusts
          </div>
            <span className="detail-value">{windGusts || "N/A"}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
          <div className="detail-label" title="Amount of sky covered by clouds. Lower is better.">
            Cloud Cover
          </div>
            <span className="detail-value">{cloudCover || "N/A"}</span>
          </div>
          <div className="detail-item">
          <div className="detail-label" title="More humidity = hazier skies. Low is better.">
            Humidity
          </div>
            <span className="detail-value">{humidity || "N/A"}</span>
          </div>
        </div>
        <div className="dr-row">
          <div className="detail-item">
          <div className="detail-label" title="Time moon rises. Affects brightness of the sky.">
            Moonrise
          </div>
            <span className="detail-value">{moonrise || "N/A"}</span>
          </div>
          <div className="detail-item">
          <div className="detail-label" title="Time moon sets. Affects how long the sky stays dark.">
            Moonset
          </div>
            <span className="detail-value">{moonset || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;