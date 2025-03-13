import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Toggle Dark Mode
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.style.backgroundColor = newMode ? "#121212" : "#ffffff";
    document.body.style.color = newMode ? "#ffffff" : "#212529";
  };

  const mainContentStyle = {
    marginLeft: isSidebarOpen ? "250px" : "0",
    transition: "margin-left 0.3s ease-in-out",
    padding: "7.1vh -1vw",
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: darkMode ? "#121212" : "#ffffff",
    color: darkMode ? "#fff" : "#212529",
    boxSizing: "border-box",
    position: "absolute",
    top: 0,
    left: 0,
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} darkMode={darkMode} toggleTheme={toggleTheme} />
      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} darkMode={darkMode} />
        <main style={mainContentStyle}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
