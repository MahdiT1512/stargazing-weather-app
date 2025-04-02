import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ConditionCard from './ConditionCard';
import ForecastCard from './ForecastCard';
import DetailedReport from './DetailedReport';
import SearchImg from '../Assets/Search.png';
import './ForecastPage.css';

const API_KEY = "bd122209090a4fd7ec889794a711eac3";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
const WEATHERAPI_KEY = "a45fabf4f5b3470b8ef110626250104";

const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${API_URL}&q=${city}`);
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
    console.error("Error fetching weather:", error);
    return null;
  }
}

const fetchTwilightData = async (lat, lon) => {
  try {
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`);
    const data = await response.json();
    return {
      astroTwilightBegin: data.results.astronomical_twilight_begin || "N/A",
      astroTwilightEnd: data.results.astronomical_twilight_end || "N/A",
    };
  } catch (error) {
    console.error("Error fetching twilight data:", error);
    return {
      astroTwilightBegin: "N/A",
      astroTwilightEnd: "N/A",
    };
  }
};

const ForecastPage = ({initialCity}) => {
  const [forecastType, setForecastType] = useState("hourly");
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [city, setCity] = useState(initialCity || "");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);

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

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setDropdownHeight(0);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
      setDropdownHeight(0);
    }
  };

  // Debounce function to limit API calls while typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isTyping && city.length >= 2) {
        fetchSuggestions(city);
      }
    }, 300); // 300ms delay before fetching suggestions

    return () => clearTimeout(delayDebounce);
  }, [city, isTyping]);

  // Update dropdown height when suggestions change
  useEffect(() => {
    if (showSuggestions && suggestions.length > 0) {
      // Approximate height: each item is ~40px high (based on padding)
      const height = Math.min(suggestions.length * 40, 200); // Cap at 200px max-height
      setDropdownHeight(height);
    } else {
      setDropdownHeight(0);
    }
  }, [showSuggestions, suggestions]);

  useEffect(() => {
    if (initialCity) {
      handleSearch(initialCity); 
    }
  }, [initialCity]);

  const handleSearch = async (searchCity = city) => {
    if (!searchCity) return;
    setShowSuggestions(false);
    setDropdownHeight(0);
    const data = await fetchWeather(searchCity);
    const astronomy = await fetchAstronomyData(searchCity);
    const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${API_KEY}`);
    const locationData = await locationResponse.json();
    if (!locationData || !locationData[0]) return;
    const { lat, lon } = locationData[0];

    const twilight = await fetchTwilightData(lat, lon);

    if (data) {
      setWeather({
        ...data,
        ...astronomy,
        ...twilight,
      });

      await fetchForecast(lat, lon);
    }
  };

  const currentDayConditions = [
    { title: "Cloud Cover", value: weather?.clouds?.all || 0 },
    { title: "Moon Phase", value: weather?.moonPhase || "Unknown" },
    { title: "Visibility", value: getVisibilityDescription(weather?.visibility || 0) },
    { title: "Seeing", value: calculateSeeing(weather?.clouds?.all || 0, weather?.windSpeed || 0, weather?.humidity || 0) },
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
      cloudCover: item.clouds?.all !== undefined ? `${item.clouds.all}%` : "N/A",
      humidity: item.main?.humidity ? `${item.main.humidity}%` : "N/A",
      dewPoint: item.main?.dew_point ? `${Math.round(item.main.dew_point)}°C` : "N/A",
      seeing: calculateSeeing(item.clouds?.all || 0, item.wind?.speed || 0, item.main?.humidity || 0),
      bortleScale: "N/A",
      astroTwilight: weather?.astroTwilightBegin ? `Begins: ${new Date(weather.astroTwilightBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "N/A",
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
      cloudCover: item.clouds?.all !== undefined ? `${item.clouds.all}%` : "N/A",
      humidity: item.main?.humidity ? `${item.main.humidity}%` : "N/A",
      dewPoint: item.main?.dew_point ? `${Math.round(item.main.dew_point)}°C` : "N/A",
      seeing: calculateSeeing(item.clouds?.all || 0, item.wind?.speed || 0, item.main?.humidity || 0),
      bortleScale: "N/A",
      astroTwilight: weather?.astroTwilightBegin ? `Begins: ${new Date(weather.astroTwilightBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "N/A",
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

  // Function to handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setCity(input);
    setIsTyping(true);
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name}, ${suggestion.country}`;
    setCity(cityName);
    setShowSuggestions(false);
    setDropdownHeight(0);
    handleSearch(cityName);
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSuggestions && !event.target.closest('.search-container')) {
        setShowSuggestions(false);
        setDropdownHeight(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  return (
    <div className="forecast-page">
      <div className="search-section">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a city..."
              className="location-input"
              value={city}
              onChange={handleInputChange}
              onFocus={() => {
                if (city.length >= 2) {
                  fetchSuggestions(city);
                }
              }}
            />
            <img className="search-img" src={SearchImg} alt="Search" onClick={() => handleSearch()} />
          </div>
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                  {suggestion.state ? `, ${suggestion.state}` : ''}
                  {suggestion.country ? `, ${suggestion.country}` : ''}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Push-down spacer that dynamically changes height */}
      <div className="dropdown-spacer" style={{ height: `${dropdownHeight}px`, transition: 'height 0.3s ease-in-out' }}></div>

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
        <h2>Tonight's Conditions</h2>
        <div className="forecast-tabs">
          <button onClick={() => setForecastType("hourly")} className={forecastType === "hourly" ? "active" : ""}>Hourly Forecast</button>
          <button onClick={() => setForecastType("weekly")} className={forecastType === "weekly" ? "active" : ""}>Weekly Forecast</button>
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
            <button className="close-btn" onClick={closeOverlay}>×</button>
            <DetailedReport {...selectedForecast} forecastType="overlay" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastPage;