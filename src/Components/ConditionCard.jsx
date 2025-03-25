import React from 'react';

const ConditionCard = ({ title, value, subtitle, iconSrc }) => {
  return (
    <div className="condition-card">
      
      <h3>{title}</h3>
      <img className="condition-icon" src={iconSrc} alt={`${title} icon`} /> 
      <p className="condition-value">{value}</p>
      <p className="condition-subtitle">{subtitle}</p>
    </div>
  );
};

export default ConditionCard;