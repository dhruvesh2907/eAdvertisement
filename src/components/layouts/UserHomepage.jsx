import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../../assets/landingPage.css";
import image1 from "../layouts/image1.webp";
import image2 from "../layouts/image2.webp";
import image3 from "../layouts/image3.webp";
import first from "../layouts/first.webp"
import Logo from "../layouts/logo.webp"
import sec from "../layouts/sec.webp"
import third from "../layouts/third.webp"
import four from "../layouts/four.webp"
import fifth from "../layouts/fifth.webp"
import logo1 from "../layouts/logo1.webp"
import six from "../layouts/six.webp"
import seven from "../layouts/seven.webp"
export const UserHomepage = () => {
  const [darkMode, setDarkMode] = useState(true);
  

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear(); // Ensure complete removal
    sessionStorage.clear(); // If used
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
    
    setTimeout(() => {
      navigate("/login");
      window.location.reload(); // Ensure fresh state
    }, 100);
  };

  return (
    <div className="main-container dark-theme"> 
    <div className="adboard-website">
      {/* Navigation */}
      
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Adboard Logo" className="logo" />
          <span className="logo-text">Adboard</span>
        </div>
        <div className="nav-links">
          <a href="/user">Home</a>
          
          <Link to="/mybookings">
                  My BOOKING
                </Link>
          {/* <a href="/billboards">Billboards</a> */}
          <a href="https://www.linkedin.com/in/dhruvesh-mehta-338216313" target="_blank" rel="noopener noreferrer">Contact</a>

          <Link to="/user/GetAllScreens">
  <button className="rent-now-btn">Rent Now</button>
</Link>
              
          <button  className="rent-now-btn" style={{background:"red" , color:"white"}}
      onClick={handleLogout}
     
    >
      LOGOUT
    </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        

      <div className="hero-image">
        
          <img src={first} alt="Billboard showcase" />
          <div className="hero-content">
          <h1>Discover Billboards Nationwide</h1>
          <p>Explore the largest network of billboards across the country</p>
          <Link to="/user/GetAllScreens">
  <button className="rent-now-btn">Rent Now</button>
</Link>
        </div>
          
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
          <Link to="/user/GetAllScreens">
                    <button className="reserve-btn">Get Your Billboard</button>
                    </Link>
        </div>
        <div className="ad-image">
          <img src={fifth} alt="Billboard advertising" />
        </div>
      </section>

      {/* Empowering Businesses Section */}
      <section className="empowering-section">
        <h2>Empowering Businesses to</h2>
        <h3>Amplify Your Presence</h3>
        <Link to="/user/GetAllScreens">
  <button className="book-now-btn">Rent Now</button>
</Link>
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
            <a href="/user">Home</a>
            
            <a href="user/GetAllScreens">Billboards</a>
            <a href="https://www.linkedin.com/in/dhruvesh-mehta-338216313" target="_blank" rel="noopener noreferrer">Contact</a>

          </div>
          
          <div className="footer-column">
            <h5>Our Services</h5>
            <a href="/user/GetAllScreens">Advertising</a>
            <a href="/user/GetAllScreens">Leasing</a>
           
          </div>
          
          <div className="footer-column">
            <h5>Company</h5>
            
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
    </div>
  );
}

  