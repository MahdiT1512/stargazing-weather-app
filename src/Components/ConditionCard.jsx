import React from 'react';

const ConditionCard = ({ title, value, subtitle, iconSrc }) => {
  return (
    <div className="condition-card">
      
      <h3>{title}</h3>
      <div className='condition-info'>
      <div className='condition-icon-container'>
      <img className="condition-icon" src={iconSrc} alt={`${title} icon`} /> 
      {console.log(iconSrc)}
      </div>
      <p className="condition-value">{value}</p>
      </div>
      <p className="condition-subtitle">{subtitle}</p>
    </div>
  );
};

export default ConditionCard;