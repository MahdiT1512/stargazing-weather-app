import React from "react";
import ForecastPage from "./Components/ForecastPage";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import './Components/Navbar.css';
import EventsPage from "./Components/EventsPage";

const App = () => {
  const [currentPage, setCurrentPage] = React.useState("home");
  
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "forecast":
        return <ForecastPage />;
      case "events":
        return <EventsPage/>;
      default:
        return <HomePage />;
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="app">
    <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    {renderPage()}
    </div>
  );
};

export default App;