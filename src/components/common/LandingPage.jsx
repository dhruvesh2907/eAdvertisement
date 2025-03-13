import React, { useState } from "react";
import "../../assets/landingPage.css";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"} style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      
      {/* Header */}
      <header className="header_section py-3" style={{ backgroundColor: darkMode ? "#1a1a1a" : "#f8f9fa" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center px-4">
          <Link className="navbar-brand" to="/" style={{ color: darkMode ? "#00aaff" : "#007bff", fontSize: "24px", fontWeight: "bold" }}>
            Promotix
          </Link>
          <div className="d-flex align-items-center">
            <button onClick={toggleTheme} className="btn btn-outline-secondary mx-2">
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
            <Link to="/login" className="btn btn-success mx-2">Login</Link>
            <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero_section text-center d-flex flex-column justify-content-center align-items-center"
        style={{ padding: "80px 5vw", background: darkMode ? "#0A0A2A" : "#e3f2fd", width: "100vw", maxWidth: "100%" }}>
        <h1 style={{ color: darkMode ? "#00aaff" : "#007bff", fontSize: "42px", fontWeight: "bold" }}>
          Transform Your Advertising with Promotix
        </h1>
        <p style={{ color: darkMode ? "#ffffff" : "#333333", fontSize: "18px", maxWidth: "800px", margin: "10px auto" }}>
          Simplify your hoarding and billboard advertisement bookings. Find prime locations, manage campaigns, and analyze impact seamlessly.
        </p>
        <div className="btn-box mt-4">
          <Link to="/login" className="btn btn-warning mx-2">Create an Ad</Link>
          <Link to="/signup" className="btn btn-outline-dark">Browse Ads</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features_section text-center" 
        style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", padding: "60px 5vw", width: "100vw", maxWidth: "100%" }}>
        <h2 style={{ color: darkMode ? "#00aaff" : "#007bff" }}>Why Choose Promotix?</h2>
        <p style={{ color: darkMode ? "#cccccc" : "#555555", fontSize: "16px", maxWidth: "800px", margin: "0 auto 20px" }}>
          A cutting-edge platform for <b>hoarding</b> and <b>billboard advertising</b> solutions.
        </p>
        <ul style={{ listStyleType: "none", padding: "0", color: darkMode ? "#ffffff" : "#333333", fontSize: "16px" }}>
          <li>✔️ Find high-traffic locations for your ads.</li>
          <li>✔️ Compare prices and book ad spaces easily.</li>
          <li>✔️ Real-time ad performance tracking.</li>
          <li>✔️ Seamless online booking and campaign management.</li>
        </ul>
        <Link to="#" className="btn btn-primary mt-4">Learn More</Link>
      </section>

    </div>
  );
};

export default LandingPage;
