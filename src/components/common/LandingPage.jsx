

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../../assets/landingPage.css";

import first from "../common/first.webp"
import Logo from "../common/logo.webp"
import sec from "../common/sec.webp"
import third from "../common/third.webp"
import four from "../common/four.webp"
import fifth from "../common/fifth.webp"
import logo1 from "../common/logo1.webp"
import six from "../common/six.webp"
import seven from "../common/seven.webp"

 const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token or user session
    localStorage.removeItem("token"); // Assuming you're using a token-based authentication system

    // Redirect user to login page
    navigate("/login");
  };

  return (
    <div className="adboard-website">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Adboard Logo" className="logo" />
          <span className="logo-text">Adboard</span>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/billboards">Billboards</a>
          <a href="/contact">Contact</a>
          <button className="rent-now-btn">Rent Now</button>
          <button
      onClick={handleLogout}
      style={{
        padding: "8px 15px",
        backgroundColor: "green",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
      }}
    >
      LOGIN
    </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">

      <div className="hero-image">
        
          <img src={first} alt="Billboard showcase" />
          
        </div>

        <div className="hero-content">
          <h1>Discover Billboards Nationwide</h1>
          <p>Explore the largest network of billboards across the country</p>
          <button className="hero-cta">Rent Now</button>
        </div>
        {/* <div className="hero-image">
          <img src={first} alt="Billboard showcase" />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h3>Proven Results</h3>
          <h2>Maximize Your Impact</h2>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <img src={sec} alt="Innovative Solutions" />
            <h4>Innovative Solutions</h4>
            <p>Reach Your Audience</p>
          </div>
          
          <div className="feature-card">
            <img src={third} alt="Streamlined Booking" />
            <h4>Streamlined Booking</h4>
            <p>Customizable Campaigns</p>
          </div>
          
          <div className="feature-card">
            <img src={four} alt="Impactful Advertising" />
            <h4>Impactful Advertising</h4>
            <p>Maximize Your Reach</p>
          </div>
        </div>
      </section>

      {/* Billboard Advertising Section */}
      <section className="billboard-ad-section">
        <div className="ad-content">
          <h3>Discover the Perfect Billboard</h3>
          <h2>Tailored Billboard Advertising</h2>
          <p>Invest in a powerful advertising platform that delivers unparalleled visibility, targeting, and measurable results for your business</p>
          <p>Unlock Endless Possibilities for Your Brand</p>
          <button className="reserve-btn">Reserve Your Billboard</button>
        </div>
        <div className="ad-image">
          <img src={fifth} alt="Billboard advertising" />
        </div>
      </section>

      {/* Empowering Businesses Section */}
      <section className="empowering-section">
        <h2>Empowering Businesses to</h2>
        <h3>Amplify Your Presence</h3>
        <button className="book-now-btn">Book Now</button>
        <div className="gallery">
          <img src={six} alt="Billboard example 1" />
          <img src={seven} alt="Billboard example 2" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-column">
            <h5>Quick Links</h5>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/billboards">Billboards</a>
            <a href="/contact">Contact</a>
          </div>
          
          <div className="footer-column">
            <h5>Our Services</h5>
            <a href="/advertising">Advertising</a>
            <a href="/leasing">Leasing</a>
            <a href="/analytics">Analytics</a>
            <a href="/support">Support</a>
          </div>
          
          <div className="footer-column">
            <h5>Company</h5>
            <a href="/about-us">About Us</a>
            <a href="/careers">Careers</a>
            <a href="/partners">Partners</a>
            <a href="/faq">FAQ</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="logo-container">
            <img src= {logo1} alt="Adboard Logo" className="footer-logo" />
          </div>
          <p>© 2025 Adboard, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;