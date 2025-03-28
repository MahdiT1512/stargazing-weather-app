import React, { useState } from "react";
import ForecastPage from "./Components/ForecastPage";

// Function to fetch weather data
const fetchWeather = async (city) => {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd122209090a4fd7ec889794a711eac3&units=metric"; // Replace with your backend URL
  try {
    const response = await fetch(`${API_URL}?city=${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Handle search functionality
  const handleSearch = async () => {
    if (!city) return;
    const data = await fetchWeather(city);
    setWeather(data);
  };

  return (
    <div className="app">
      <h1>Weather App 🌤</h1>
      
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>

      {weather && weather.main ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : weather ? (
        <p>City not found. Try another.</p>
      ) : null}

      {/* Render ForecastPage component */}
      <ForecastPage />
    </div>
  );
};

export default App;
