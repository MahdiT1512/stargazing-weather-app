import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ForecastPage from "./Components/ForecastPage";
import CommunityPage from "./Components/CommunityPage";
import NewBlog from "./Components/NewBlog";

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

const HomePage = () => {
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ForecastPage" element={<ForecastPage />} />
        <Route path="/events" element={<h1>Events Page</h1>} />
        <Route path="/CommunityPage" element={<CommunityPage />} />
        <Route path="/NewBlog" element={<NewBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
