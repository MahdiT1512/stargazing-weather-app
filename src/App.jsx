import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ForecastPage from "./Components/ForecastPage";
import CommunityPage from "./Components/CommunityPage";
import EventsPage from "./Components/EventsPage";
import NewBlog from "./Components/NewBlog";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/ForecastPage" element={<ForecastPage />} />
        <Route path="/EventsPage" element={<EventsPage />} />
        <Route path="/CommunityPage" element={<CommunityPage />} />
        <Route path="/NewBlog" element={<NewBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
