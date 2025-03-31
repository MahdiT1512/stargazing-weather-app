import React, { useState } from 'react';
import Navbar from './Navbar';
import ConditionCard from './ConditionCard';
import ForecastCard from './ForecastCard';
import DetailedReport from './DetailedReport';
import SearchImg from '../Assets/Search.png';
import './ForecastPage.css';
import { useEffect } from 'react';

const fetchWeather = async (city) => {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?appid=bd122209090a4fd7ec889794a711eac3&units=metric";
  try {
    const response = await fetch(`${API_URL}&q=${city}`);    
    const data = await response.json();
    const { lat, lon } = data.coord;
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=bd122209090a4fd7ec889794a711eac3&units=metric`);
    const forecastData = await forecastResponse.json();
    return{ weather: data, hourlyForecast: forecastData.hourly, dailyForecast: forecastData.daily };
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

const ForecastPage = ({initialCity}) => {
  const [forecastType, setForecastType] = useState("hourly");
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [city, setCity] = useState(initialCity || "");
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    if (initialCity) {
      handleSearch(initialCity); 
    }
  }, [initialCity]);

  const handleSearch = async () => {
    if (!city) return;
    const data = await fetchWeather(city);
    if (data){
      const { currentWeather, hourlyForecast, dailyForecast } = data;
      setWeather(currentWeather); 
      setHourlyForecast(hourlyForecast); 
      setDailyForecast(dailyForecast); ;
    }
  };

  const conditionMappings = {
    
    "Cloud Cover": {
      values: [
        { value: weather?.clouds?.all || 0 , subtitle:  weather?.clouds?.all > 75 ? "Overcast" :
          weather?.clouds?.all > 50 ? "Partly Cloudy" :
          weather?.clouds?.all > 25 ? "Mostly Clear" :
          "Clear Skies", imgNum: 0 },
      ],
    },
    "Moon Phase": {
      values: [
        { value: "New Moon", subtitle: "Minimal Moonlight (Optimal)", imgNum: 1 },
        { value: "Full Moon", subtitle: "Bright Moonlight (Suboptimal)", imgNum: 1 },
      ],
    },
    "Transparency": {
      values: [
        { value: "High", subtitle: "Good for Deep-sky Viewing", imgNum: 2 },
        { value: "Medium", subtitle: "Average for Deep-sky Viewing", imgNum: 2 },
        { value: "Low", subtitle: "Poor for Deep-sky Viewing", imgNum: 2 },
      ],
    },
    "Seeing": {
      values: [
        { value: "5/5", subtitle: "Excellent Atmosphere Stability", imgNum: 3 },
        { value: "4/5", subtitle: "Stable Atmosphere (Optimal)", imgNum: 3 },
        { value: "3/5", subtitle: "Moderate Atmosphere Stability", imgNum: 3 },
        { value: "2/5", subtitle: "Unstable Atmosphere", imgNum: 3 },
      ],
    },
  };

  const getConditionDetails = (title, value) => {
    const mapping = conditionMappings[title];
    if (!mapping) return { subtitle: "No data available", imgNum: 0 };

    const match = mapping.values.find((item) => {
      if (item.range) {
        return value >= item.range[0] && value <= item.range[1];
      }
      return item.value === value;
    });

    const formattedValue =
      title === "Cloud Cover" ? `${value}%` : value;

    return match
      ? { ...match, value: formattedValue }
      : { subtitle: "No data available", imgNum: 0, value: formattedValue };
  };

  const currentDayConditions = [
    { title: "Cloud Cover", value: weather?.clouds?.all || 0, subtitle: weather?.clouds?.all > 75 ? "Overcast" :
      weather?.clouds?.all > 50 ? "Partly Cloudy" :
      weather?.clouds?.all > 25 ? "Mostly Clear" :
      "Clear Skies"},
    { title: "Moon Phase", value: "Full Moon" },
    { title: "Transparency", value: "Medium" },
    { title: "Seeing", value: "3/5" },
  ];

  const mapHourlyForecastData = (data) => {
    if (!data?.list || data.list.length === 0) {
     
      console.warn("No hourly forecast data available");
      return [];
    }
    const forecast = data.list.slice(0, 4).map((hour) => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      date: new Date(hour.dt * 1000).toLocaleDateString(),
      temperature: `${hour.temp || '0'}°C`, 
      moonPhase: hour.moonPhase || 'New Moon',
      moonset: hour.moonset || 'N/A',
      moonrise: hour.moonrise || 'N/A',
      windSpeed: `${hour.windSpeed || '0'} km/h`,
      windGusts: `${hour.windGusts || '0'} km/h`,
      cloudCover: `${hour.cloudCover || weather?.clouds?.all || 0}%`,
      humidity: `${hour.humidity || weather?.main?.humidity || 0}%`,
      seeing: hour.seeing || 'N/A',
      bortleScale: hour.bortleScale || 'N/A',
      dewPoint: `${hour.dewPoint || weather?.main?.temp_min || 0}°C`,
      astroTwilight: hour.astroTwilight || 'N/A',
      transparency: hour.transparency || 'High',
      visibility: hour.visibility || 'Good',
    }));

    return forecast;
  };
  console.log("hourlyForecast", hourlyForecast);


  const hourlyForecastData =  mapHourlyForecastData(hourlyForecast);

  const weeklyForecastData = [
    { 
      time: 'Monday', 
      date: 'March 25', 
      temperature: '14°C', 
      moonPhase: 'Full Moon',
      moonset: '6:20 AM',
      moonrise: '6:50 PM',
      windSpeed: '12 km/h',
      windGusts: '20 km/h',
      cloudCover: '30%',
      humidity: '60%',
      seeing: '3/5',
      bortleScale: '5',
      dewPoint: '12°C',
      astroTwilight: '8:30 PM',
      transparency: 'Medium',
      visibility: 'Good'
    },
    { 
      time: 'Tuesday', 
      date: 'March 26', 
      temperature: '17°C', 
      moonPhase: 'Full Moon',
      moonset: '6:45 AM',
      moonrise: '7:15 PM',
      windSpeed: '28 km/h',
      windGusts: '35 km/h',
      cloudCover: '50%',
      humidity: '58%',
      seeing: '2/5',
      bortleScale: '6',
      dewPoint: '12°C',
      astroTwilight: '8:35 PM',
      transparency: 'Low',
      visibility: 'Poor'
    },
    { 
      time: 'Wednesday', 
      date: 'March 27', 
      temperature: '19°C', 
      moonPhase: 'Full Moon',
      moonset: '7:10 AM',
      moonrise: '7:40 PM',
      windSpeed: '15 km/h',
      windGusts: '22 km/h',
      cloudCover: '20%',
      humidity: '53%',
      seeing: '3/5',
      bortleScale: '4',
      dewPoint: '12°C',
      astroTwilight: '8:40 PM',
      transparency: 'Medium',
      visibility: 'Good'
    },
    { 
      time: 'Thursday', 
      date: 'March 28', 
      temperature: '20°C', 
      moonPhase: 'Full Moon',
      moonset: '7:35 AM',
      moonrise: '8:05 PM',
      windSpeed: '10 km/h',
      windGusts: '18 km/h',
      cloudCover: '25%',
      humidity: '50%',
      seeing: '4/5',
      bortleScale: '4',
      dewPoint: '12°C',
      astroTwilight: '8:45 PM',
      transparency: 'Medium',
      visibility: 'Okay'
    },
  ];

  const forecastData = forecastType === 'hourly' ? hourlyForecastData : weeklyForecastData;

  const handleForecastSelect = (forecast) => {
    setSelectedForecast(forecast);
  };

  const closeOverlay = () => {
    setSelectedForecast(null);
  };

  return (
    <div className="forecast-page">

      <div className="search-bar">
        <input
          type="text"
          placeholder="Greater London, London"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="location-input"
        />
        <img className="search-img" src={SearchImg} alt="Search" onClick={handleSearch} />
      </div>
      {weather && weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : weather ? (
        <p>City not found. Try another.</p>
      ) : null}

      <section className="stargazing-conditions">
        <h2>Stargazing Conditions</h2>
        <div className="conditions-cards">
          {currentDayConditions.map((condition, index) => {
            const { subtitle, imgNum, value } = getConditionDetails(
              condition.title,
              condition.value
            );
            return (
              <ConditionCard
                key={index}
                title={condition.title}
                value={value}
                subtitle={subtitle}
                imgNum={imgNum}
              />
            );
          })}
        </div>
      </section>

      <section className="tonights-conditions">
        <h2>Tonight’s Conditions</h2>
        <div className="forecast-tabs">
          <button
            onClick={() => setForecastType("hourly")}
            className={forecastType === "hourly" ? "active" : ""}
          >
            Hourly Forecast
          </button>
          <button
            onClick={() => setForecastType("weekly")}
            className={forecastType === "weekly" ? "active" : ""}
          >
            Weekly Forecast
          </button>
        </div>

        <div className="forecast-cards">
          {forecastData.map((forecast, index) => (
            <div key={index} onClick={() => handleForecastSelect(forecast)}>
              <ForecastCard {...forecast} />
            </div>
          ))}
        </div>
      </section>

      {selectedForecast && (
        <div className="details-overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={closeOverlay}>
              ×
            </button>
            <DetailedReport
              temperature={selectedForecast.temperature}
              visibility={selectedForecast.visibility}
              moonPhase={selectedForecast.moonPhase}
              moonrise={selectedForecast.moonrise}
              moonset={selectedForecast.moonset}
              dewPoint={selectedForecast.dewPoint}
              astroTwilight={selectedForecast.astroTwilight}
              transparency={selectedForecast.transparency}
              windSpeed={selectedForecast.windSpeed}
              windGusts={selectedForecast.windGusts}
              cloudCover={selectedForecast.cloudCover}
              humidity={selectedForecast.humidity}
              seeing={selectedForecast.seeing}
              bortleScale={selectedForecast.bortleScale}
              date={selectedForecast.date}
              time={selectedForecast.time}
              forecastType={forecastType}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastPage;