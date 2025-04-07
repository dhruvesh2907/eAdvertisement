import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
// import {Login}  from './components/common/Login'
import Login from './components/common/Login';
import SignUp from './components/common/Signup';
// import { Signup } from './components/common/Signup'
// import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/user/UserProfile'

 import LoginSignUp from './components/common/LoginSignUp'
import { DemoSidebar } from './components/admin/DemoSidebar'
import { Demo } from './components/admin/Demo'
// import { AgencySidebar } from './components/layouts/AgencySidebar'
import { AdvertisementForm } from './components/user/agency/AdvertisementForm'
// import { AddScreen } from "./components/user/agency/AddScreen";
import LandingPage from "./components/common/LandingPage";
import axios from "axios";
import { AddScreen2 } from "./components/user/agency/AddScreen2";
import { ViewMyScreens } from "./components/user/agency/ViewMyScreens";
import{AgencyHomepage} from "./components/layouts/AgencyHomepage"
import PrivateRoutes from "./hooks/PrivateRoutes";
import { UpdateMyScreen } from './components/user/agency/UpdateMyScreen';
import { ResetPassword } from "./components/common/ResetPassword";
import { UserHomepage } from './components/layouts/UserHomepage';
import GetAllScreens from './components/user/agency/GetAllScreens';
import PaymentSuccess from './components/user/agency/PaymentSucces';
import AdminHomepage from './components/layouts/AdminHomepage';
import MyBookings from './components/user/agency/MyBookings';
import { ForgotPassword } from './components/common/ForgotPassword';

function App() {
  const [count, setCount] = useState(0)
   axios.defaults.baseURL = "http://localhost:3000"
   const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <>
      <div
        className={
          location.pathname === "/login" || location.pathname === "/signup"
            ? "" // No class for login and signup pages
            : "app-container"
        }
      ></div>
        
        <div className=''>
           <Routes>
           
           <Route path="/user/success" element={<PaymentSuccess />} />
           <Route path="/Mybookings" element={<MyBookings />} />
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path ="/forgot-password" element={<ForgotPassword/>}/>
        <Route path ="/resetpassword/:token" element={<ResetPassword/>}></Route>
      
        {/* Private Routes */}
        <Route path="/*" element={<PrivateRoutes />} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* User Routes (Inside PrivateRoutes) */}
        <Route element={<PrivateRoutes />}>
        <Route path="/user" element={<UserHomepage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/user/GetAllScreens" element={<GetAllScreens />} />
          
          {/* Agency Routes */}
          <Route path="/agency" element={<AgencyHomepage />} />
          <Route path="/agency/addscreen" element={<AddScreen2 />} />
          <Route path="/agency/myscreens" element={<ViewMyScreens />} />
          <Route path="/agency/profile" element={<AdvertisementForm />} />
          <Route path="/agency/updateScreen/:id" element={<UpdateMyScreen />} />
          <Route path="/admin" element={<AdminHomepage />} />
        </Route>
      </Routes>
        </div>
    
    </>
  )
}

export default App
