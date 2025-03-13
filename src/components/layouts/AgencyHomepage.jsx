import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "../../assets/landingPage.css";
import image1 from "../layouts/image1.webp";
import image2 from "../layouts/image2.webp";
import image3 from "../layouts/image3.webp";


export const AgencyHomepage = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="main-container" style={{ maxHeight: "100vh", overflowY: "auto", overflowX: "hidden" }}>
      
      {/* Hero Section with Carousel */}
      <section className="hero_section text-center d-flex flex-column justify-content-center align-items-center"
        style={{ padding: "0px 5vw", background: darkMode ? "#0A0A2A" : "#e3f2fd", width: "100vw", maxWidth: "100%" }}>
        
        <Carousel fade style={{ maxWidth: "1650px", width: "120%"  }}>
          <Carousel.Item>
            <img className="d-block w-100 "   src={image1} alt="Billboard Advertising" />
            <Carousel.Caption>
              <h3>Billboard Advertising Made Easy</h3>
              <p>Find high-traffic locations for your brand visibility.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={image2} alt="Real-time Analytics" />
            <Carousel.Caption>
              <h3>Monitor Your Campaigns</h3>
              <p>Track ad performance in real-time with AI insights.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={image3} alt="Seamless Booking" />
            <Carousel.Caption>
              <h3>Seamless Booking Process</h3>
              <p>Book ad spaces online with just a few clicks.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <h1 style={{ color: darkMode ? "#00aaff" : "#007bff", fontSize: "42px", fontWeight: "bold", marginTop: "20px" }}>
          Elevate Your Advertising with Promotix
        </h1>
        <p style={{ color: darkMode ? "#ffffff" : "#333333", fontSize: "18px", maxWidth: "800px", margin: "10px auto" }}>
          Promotix simplifies billboard and hoarding advertisements. We help brands connect with prime locations, manage campaigns, and analyze performance effortlessly.
        </p>
        <div className="btn-box mt-4">
          <Link to="/agency/addscreen" className="btn btn-warning mx-2">Get Started</Link>
          <Link to="/agency/myscreens" className="btn btn-outline-dark">View Your Screen</Link>
        </div>
      </section>

      {/* About Promotix */}
      <section className="about_section text-center" 
        style={{ backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", padding: "60px 5vw", width: "100vw", maxWidth: "100%" }}>
        <h2 style={{ color: darkMode ? "#00aaff" : "#007bff" }}>Why Choose Promotix?</h2>
        <p style={{ color: darkMode ? "#cccccc" : "#555555", fontSize: "16px", maxWidth: "800px", margin: "0 auto 20px" }}>
          Our platform revolutionizes outdoor advertising by offering:
        </p>
        <ul style={{ listStyleType: "none", padding: "0", color: darkMode ? "#ffffff" : "#333333", fontSize: "16px" }}>
          <li>✔️ AI-driven location recommendations.</li>
          <li>✔️ Competitive pricing & seamless booking.</li>
          <li>✔️ Real-time ad performance tracking.</li>
          <li>✔️ Easy management & flexible campaign options.</li>
        </ul>
        <Link to="/agency" className="btn btn-primary mt-4">Learn More</Link>
      </section>

    </div>
  );
};
