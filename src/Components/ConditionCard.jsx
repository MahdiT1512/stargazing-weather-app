import React from 'react';
import Cloud from '../Assets/Cloud.png';
import Moon from '../Assets/Moon Symbol.png';
import Haze from '../Assets/Haze.png';
import Eye from '../Assets/Icon.png';


const iconArr = [Cloud, Moon, Haze, Eye];
const ConditionCard = ({ title, value, subtitle, imgNum}) => {
  
  return (
    <div className="condition-card">
      
      <h3>{title}</h3>
      <div className='condition-info'>
      <div className='condition-icon-container'>
      <img className="condition-icon" src={iconArr[imgNum]} alt={`${title} icon`} /> 
      </div>
      <p className="condition-value">{value}</p>
      </div>
      <p className="condition-subtitle">{subtitle}</p>
    </div>
  );
};

export default ConditionCard;