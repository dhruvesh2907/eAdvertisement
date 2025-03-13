import React, { useState } from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import logo from "../layouts/Logo.jpg";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";



// import { Link } from "react-router-dom";

export const AgencyNavbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle Dark Mode
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const navStyle = {
    backgroundColor: darkMode ? "#212529" : "#f8f9fa",
    color: darkMode ? "#fff" : "#212529",
    padding: "10px 15px",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: 55,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s ease-in-out",
    boxShadow: darkMode ? "0px 4px 6px rgba(0,0,0,0.2)" : "0px 2px 4px rgba(0,0,0,0.1)"
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginLeft: "15px",
  };

  const logoStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "5px",
    marginRight: "10px",
  };

  const btnStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "5px",
    color: darkMode ? "#fff" : "#212529",
  };

  return (
    
    <nav style={navStyle}>
      {/* Sidebar Toggle Button on Left */}
      <button style={btnStyle} onClick={toggleSidebar}>
        <img src={hamburgermenu} alt="Menu" style={{ height: "25px", width: "25px" }} />
      </button>

      {/* Logo & Brand Name */}
      <div style={logoContainerStyle}>
        <img src={logo} alt="Promotix Logo" style={logoStyle} />
        <h2 style={{ color: "#007bff", fontSize: "24px", fontWeight: "bold", marginTop: "5px" }}>Promotix</h2>
      </div>
      {/* <div className="d-flex align-items-center">
            <button onClick={toggleTheme} className="btn btn-outline-secondary mx-2">
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button></div> */}

      {/* Navbar Links */}
      <ul style={{ display: "flex", listStyle: "none", marginLeft: "auto", padding: 0 }}>
        <li style={{ marginRight: "15px", marginTop: "15px" }}>
          <Link to="/agency" style={{ color: darkMode ? "#fff" : "#212529", textDecoration: "none", padding: "8px 12px" }}>
            Home
          </Link>
        </li>
        
        
        
           
      </ul>
     
      {/* Dark Mode Toggle */}
      {/* <button
        onClick={toggleDarkMode}
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          marginRight: "15px",
        }}
      >
        {darkMode ? <FaSun color="yellow" /> : <FaMoon color="black" />}
      </button> */}

      {/* Search & Logout */}
      <ul style={{ display: "flex", listStyle: "none", margin: "0 10px", padding: 0 }}>
        <li style={{ marginRight: "10px", marginTop: "5px" }}>
          <Link to="#" style={{ color: darkMode ? "#fff" : "#212529" }}>
            <BsSearch size={18} />
          </Link>
        </li>
        <li>
        

<button
  style={{
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  }}
>
  <Link
    to="/login"
    style={{
      color: "inherit",
      textDecoration: "none",
      display: "block",
      width: "100%",
      height: "100%",
    }}
  >
    LOGOUT
  </Link>
</button>

        </li>
      </ul>
    </nav>
  );
};
