// import React, { useState } from "react";
// import logo from "../layouts/Logo.jpg";
// import { Link, Outlet } from "react-router-dom";
// import { AgencyNavbar } from "./AgencyNavbar";
// export const AgencySidebar = () => {
//   const [isSidebarOpen, setSidebarOpen] = React.useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const sidebarStyle = {
//     width: isSidebarOpen ? "250px" : "0px",
//     height: "100vh",
//     backgroundColor: "#222",
//     color: "#fff",
//     transition: "width 0.3s",
//     overflow: "hidden",
//     padding: isSidebarOpen ? "15px" : "0",
//     position: "fixed",
//     left: "0",
//     top: "55px",
//     boxShadow: "2px 0 5px rgba(0, 0, 0, 0.5)",
//   };

//   const mainContentStyle = {
//     marginLeft: isSidebarOpen ? "250px" : "0",
//     transition: "margin-left 0.3s",
//     padding: "7.1vh 0vw",
//     width: "100vw",  // Ensure it takes full width
//     height: "100vh", // Ensure it takes full height
//     boxSizing: "border-box",
//     backgroundColor: "white",  // Make entire background white
//     minHeight: "100vh",
//     position: "absolute", // Ensures it starts from the top-left corner
//     top: 0,
//     left: 0
// };



//   return (
//     <>
//       <AgencyNavbar toggleSidebar={toggleSidebar} />
//       <div style={{ display: "flex" }}>
//         <aside style={sidebarStyle}>
//           <nav>
//             <ul style={{ listStyle: "none", padding: 0 }}>
//               <li style={{ marginBottom: "10px" }}>
//                 <Link to="addscreen" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#444", borderRadius: "5px" }}>
//                   <i className="bi bi-speedometer" style={{ marginRight: "10px" }} />
//                   ADD SCREEN
//                 </Link>
//               </li>
//               <li style={{ marginBottom: "10px" }}>
//                 <Link to="myscreens" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#444", borderRadius: "5px" }}>
//                   <i className="bi bi-speedometer" style={{ marginRight: "10px" }} />
//                   VIEW MY SCREENS
//                 </Link>
//               </li>
//               <li>
//                 <a href="#" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#444", borderRadius: "5px" }}>
//                   <i className="bi bi-box-seam-fill" style={{ marginRight: "10px" }} />
//                   Widgets
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </aside>
//         <main style={mainContentStyle}>
//           <Outlet />
//         </main>
//       </div>
//     </>
//   );
// };
