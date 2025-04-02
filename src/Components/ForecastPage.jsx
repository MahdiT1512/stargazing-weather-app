import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ConditionCard from './ConditionCard';
import ForecastCard from './ForecastCard';
import DetailedReport from './DetailedReport';
import SearchImg from '../Assets/Search.png';
import { useParams } from "react-router-dom";
import './ForecastPage.css';

const API_KEY = "bd122209090a4fd7ec889794a711eac3";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
const WEATHERAPI_KEY = "a45fabf4f5b3470b8ef110626250104";

const ForecastPage = () => {
  const [currentCity, setCurrentCity] = useState(""); // The city shown in the search bar
  const [typedCity, setTypedCity] = useState(""); // The city shown in the search bar
  const [cityFound, setCityFound] = useState(false); // The city shown in the search bar

  const [forecastType, setForecastType] = useState("hourly");
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const savedCity = localStorage.getItem("defaultCity");
    if (savedCity) {
      setTypedCity(savedCity); // Ensure the typedCity is also set to that value
      handleSearch(savedCity); // Fetch weather data for the saved city
      localStorage.removeItem("defaultCity"); // Clear storage after use
    }
  }, []);

// Handle search button click
const handleSearchClick = () => {
  if (typedCity) {
    handleSearch(typedCity); // Trigger the search with the typed city (use typedCity instead of city)
  } else {
    console.log("Please enter a city"); // Handle empty search case
  }
};

const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${API_URL}&q=${city}`);

    // Check if the response is successful (status code 2xx)
    if (!response.ok) {
      if (response.status === 404) {
        console.log("City \"" + city + "\" not found. Please check the city name.");
        setCityFound(false); // Set cityFound to false if city is not found
        setCurrentCity(""); // Reset current city if not found
        return null; // Return null if city is not found, no exception is thrown
      } else {
        // For other error status codes (e.g., 500), just log the error and return null
        console.log(`Error: ${response.status} - ${response.statusText}`);
        return null; // You can decide to return null or handle differently
      }
    }
    setCityFound(true);
    setCurrentCity(city); // Set the current city to the one found
    const data = await response.json();
    return {
      ...data,
      visibility: data.visibility, // in meters
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windGusts: data.wind.gust,
      clouds: data.clouds,
    };
  } catch (error) {
    console.log("Error fetching weather data:", error.message);
    //console.error("Error fetching weather:", error);
    return null;
  }
}

  const calculateSeeing = (cloud, wind, humidity) => {
    if (cloud > 75 || wind > 30 || humidity > 90) return "1/5";
    if (cloud > 50 || wind > 25 || humidity > 80) return "2/5";
    if (cloud > 40 || wind > 20 || humidity > 70) return "3/5";
    if (cloud > 30 || wind > 15 || humidity > 60) return "4/5";
    return "5/5";
  };

  const getVisibilityDescription = (visibility) => {
    if (visibility >= 10000) return "Very clear";
    if (visibility >= 6000) return "Good";
    if (visibility >= 4000) return "Moderate";
    if (visibility >= 1000) return "Poor";
    
    return "Very poor";
  };

  const fetchForecast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    setForecast(data.list || []);
  };

  const fetchAstronomyData = async (city) => {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=${WEATHERAPI_KEY}&q=${city}&dt=${today}`
    );
    const data = await response.json();
    return {
      moonPhase: data?.astronomy?.astro?.moon_phase || "Unknown",
      moonrise: data?.astronomy?.astro?.moonrise || "N/A",
      moonset: data?.astronomy?.astro?.moonset || "N/A",
    };
  };

  const handleSearch = async (searchCity) => {
    if (!searchCity) {
      console.log("No city provided.");
      return;
    }
  
    try {
      // Fetch weather data
      const data = await fetchWeather(searchCity);
      if (!data) {
        console.log("Error fetching weather data.");
        return;
      }
  
      // Fetch astronomy data
      const astronomy = await fetchAstronomyData(searchCity);
      if (!astronomy) {
        console.log("Error fetching weather data.");
        return;
      }
  
      // Set weather data along with astronomy data
      setWeather({
        ...data,
        ...astronomy,
      });
  
      // Fetch geo-location data (latitude and longitude)
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${API_KEY}`);
      const locationData = await response.json();
      
      // If no location data or no valid coordinates, log error and return
      if (!locationData || !locationData[0]) {
        console.log("Location data not found for: ", searchCity);
        return;
      }
  
      const { lat, lon } = locationData[0];
  
      // Fetch forecast based on latitude and longitude
      await fetchForecast(lat, lon);
    } catch (error) {
      console.error("Error during search process:", error);
    }
  };

  const currentDayConditions = [
    { title: "Cloud Cover", value: cityFound ? weather?.clouds?.all || 0 : 0 },
    { title: "Moon Phase", value: cityFound ? weather?.moonPhase || "N/A" : "N/A" },
    { title: "Visibility", value: cityFound ? (weather && weather.visibility !== undefined ? getVisibilityDescription(weather.visibility) : "N/A") : "N/A" },
    { title: "Seeing", value: cityFound ? (weather ? calculateSeeing(weather.clouds?.all || 0, weather.windSpeed || 0, weather.humidity || 0) : "N/A") : "N/A" },
  ];

  const conditionMappings = {
    "Cloud Cover": {
      values: [
        { value: weather?.clouds?.all || 0 , subtitle:  weather?.clouds?.all > 75 ? "Overcast" :
          weather?.clouds?.all > 50 ? "Partly Cloudy" :
          weather?.clouds?.all > 25 ? "Mostly Clear" :
          "Clear Skies" },
      ],
    },
    "Moon Phase": {
      values: [
        { value: "New Moon", subtitle: "Minimal Moonlight (Optimal)" },
        { value: "Full Moon", subtitle: "Bright Moonlight (Suboptimal)" },
        { value: "First Quarter", subtitle: "Growing Visibility" },
        { value: "Last Quarter", subtitle: "Shrinking Visibility" },
        { value: "Waning Crescent", subtitle: "Dimming Moon" },
        { value: "Waning Gibbous", subtitle: "Still Quite Bright" },
        { value: "Waxing Crescent", subtitle: "Moonlight Emerging" },
        { value: "Waxing Gibbous", subtitle: "Brightening Moon" },
      ],
    },
    "Visibility": {
      values: [
        { value: "Very clear", subtitle: "Excellent visibility for stargazing" },
        { value: "Good", subtitle: "Decent visibility for stargazing" },
        { value: "Moderate", subtitle: "Some atmospheric obstruction" },
        { value: "Poor", subtitle: "Limited stargazing visibility" },
        { value: "Very poor", subtitle: "Viewing not recommended" },
      ],
    },
    "Seeing": {
      values: [
        { value: "5/5", subtitle: "Excellent Viewing Conditions"},
        { value: "4/5", subtitle: "Decent Viewing Conditions"},
        { value: "3/5", subtitle: "Moderate Viewing Conditions"},
        { value: "2/5", subtitle: "Inoptimal Viewing Conditions"},
        { value: "1/5", subtitle: "Poor Viewing Conditions"},
        { value: "0/5", subtitle: "Viewing not Suggested"},
      ],
    },
  };

  const getConditionDetails = (title, value) => {
    const mapping = conditionMappings[title];
    if (!mapping) return { subtitle: "No data available" };

    const match = mapping.values.find((item) => {
      return item.value === value;
    });

    const formattedValue =
      title === "Cloud Cover" ? `${value}%` : value;

    return match
      ? { ...match, value: formattedValue }
      : { subtitle: "No data available", value: formattedValue };
  };

  const hourlyForecastData = forecast.slice(0, 4).map(item => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
      temperature: item.main?.temp ? `${Math.round(item.main.temp)}°C` : "N/A",
      moonPhase: weather?.moonPhase || "N/A",
      moonrise: weather?.moonrise || "N/A",
      moonset: weather?.moonset || "N/A",
      windSpeed: item.wind?.speed ? `${Math.round(item.wind.speed)} km/h` : "N/A",
      windGusts: item.wind?.gust ? `${Math.round(item.wind.gust)} km/h` : "N/A",
      cloudCover: item.clouds?.all ? `${item.clouds.all}%` : "N/A",
      humidity: item.main?.humidity ? `${item.main.humidity}%` : "N/A",
      seeing: calculateSeeing(item.clouds?.all || 0, item.wind?.speed || 0, item.main?.humidity || 0),
      bortleScale: "N/A",
      dewPoint: "N/A",
      astroTwilight: "N/A",
      visibility: item.visibility
        ? getVisibilityDescription(item.visibility * 1000)
        : "N/A"
    };
  });

  const dailyMap = new Map();
  forecast.forEach(item => {
    const dateKey = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyMap.has(dateKey)) dailyMap.set(dateKey, item);
  });
  const weeklyForecastData = Array.from(dailyMap.values()).slice(0, 4).map(item => {
    const date = new Date(item.dt * 1000);
    return {
      time: date.toLocaleDateString(undefined, { weekday: 'long' }),
      date: date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
      temperature: item.main?.temp ? `${Math.round(item.main.temp)}°C` : "N/A",
      moonPhase: weather?.moonPhase || "N/A",
      moonrise: weather?.moonrise || "N/A",
      moonset: weather?.moonset || "N/A",
      windSpeed: item.wind?.speed ? `${Math.round(item.wind.speed)} km/h` : "N/A",
      windGusts: item.wind?.gust ? `${Math.round(item.wind.gust)} km/h` : "N/A",
      cloudCover: item.clouds?.all ? `${item.clouds.all}%` : "N/A",
      humidity: item.main?.humidity ? `${item.main.humidity}%` : "N/A",
      seeing: calculateSeeing(item.clouds?.all || 0, item.wind?.speed || 0, item.main?.humidity || 0),
      bortleScale: "N/A",
      dewPoint: "N/A",
      astroTwilight: "N/A",
      visibility: item.visibility
        ? getVisibilityDescription(item.visibility * 1000)
        : "N/A"
    };
  });

  const forecastData = forecastType === 'hourly' ? hourlyForecastData : weeklyForecastData;

  const handleForecastSelect = (forecast) => {
    setSelectedForecast(forecast);
  };

  const closeOverlay = () => {
    setSelectedForecast(null);
  };

  const fixedImageMap = {
    "Cloud Cover": 0,
    "Moon Phase": 1,
    "Visibility": 2,
    "Seeing": 3,
  };

  return (
    <div className="forecast-page">
      <Navbar />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Greater London, London"
          className="location-input"
          value={typedCity}
          onChange={(e) => setTypedCity(e.target.value)}
        />
        <img className="search-img" src={SearchImg} alt="Search"  onClick={handleSearchClick}/>
      </div>

      <section className="stargazing-conditions">
        <h2>Stargazing Conditions</h2>
        <div className="conditions-cards">
          {currentDayConditions.map((condition, index) => {
            const { subtitle, value } = getConditionDetails(
              condition.title,
              condition.value
            );
            return (
              <ConditionCard
                key={index}
                title={condition.title}
                value={value}
                subtitle={subtitle}
                imgNum={fixedImageMap[condition.title]}
              />
            );
          })}
        </div>
      </section>

      <section className="tonights-conditions">
      <h2>{currentCity && currentCity.trim() !== "" ? `Tonight’s Conditions in ${currentCity}` : "Tonight's Conditions"}</h2>
        <div className="forecast-tabs">
          <button onClick={() => setForecastType("hourly")} className={forecastType === "hourly" ? "active" : ""}>Hourly Forecast</button>
          <button onClick={() => setForecastType("weekly")} className={forecastType === "weekly" ? "active" : ""}>Weekly Forecast</button>
        </div>
        {/* Conditional rendering based on cityFound */}
        <div className="forecast-cards">
          {cityFound ? (
            forecastData.map((forecast, index) => (
              <div key={index} onClick={() => handleForecastSelect(forecast)}>
                <ForecastCard {...forecast} />
              </div>
            ))
          ) : (
            <div className="not-found">
              <p>City not found</p>
            </div>   
          )}
        </div>
      </section>

      {selectedForecast && (
        <div className="details-overlay">
          <div className="overlay-content">
            <button className="close-btn" onClick={closeOverlay}>×</button>
            <DetailedReport {...selectedForecast} forecastType="overlay" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastPage;