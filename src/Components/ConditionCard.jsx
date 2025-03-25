import React from 'react';

const ConditionCard = ({ title, value, subtitle }) => {
  return (
    <div className="condition-card">
      {/* Placeholder for condition icon */}
      {/* /*<img className="condition-icon" src={iconSrc} alt={`${title} icon`} /> */ }
      
      <h3>{title}</h3>
      <p className="condition-value">{value}</p>
      <p className="condition-subtitle">{subtitle}</p>
    </div>
  );
};

export default ConditionCard;