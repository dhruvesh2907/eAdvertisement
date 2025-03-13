import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
// import {Login}  from './components/common/Login'
import Login from './components/common/Login';
import SignUp from './components/common/Signup';
// import { Signup } from './components/common/Signup'
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/user/UserProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
 import LoginSignUp from './components/common/LoginSignUp'
import { DemoSidebar } from './components/admin/DemoSidebar'
import { Demo } from './components/admin/Demo'
import { AgencySidebar } from './components/layouts/AgencySidebar'
import { AdvertisementForm } from './components/user/agency/AdvertisementForm'
// import { AddScreen } from "./components/user/agency/AddScreen";
import LandingPage from "./components/common/LandingPage";
import axios from "axios";
import { AddScreen2 } from "./components/user/agency/AddScreen2";
import { ViewMyScreens } from "./components/user/agency/ViewMyScreens";
import{AgencyHomepage} from "./components/layouts/AgencyHomepage"
import PrivateRoutes from "./hooks/PrivateRoutes";
import { UpdateMyScreen } from './components/user/agency/UpdateMyScreen';
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
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<PrivateRoutes />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
      </Routes>
      <body class="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
        <div className='app-wrapper'>
        <Routes>
         {/* <Route path="" element={<PrivateRoutes />}></Route> */}
        <Route path="/" element ={<LandingPage/>}></Route>
        {/* <Route path="" element={<PrivateRoutes />}></Route> */}
          <Route path='/user' element={<UserSidebar />} >
          
            <Route path='profile' element={<UserProfile />}></Route>
          </Route>
          {/* <Route path='/DemoUser' element={<DemoSidebar />} >
            <Route path='profile' element={<Demo/>}></Route>
          </Route> */}
           
              
              <Route path='/Agency' element={<AgencySidebar />}>
              <Route path='/Agency' element={<AgencyHomepage/>}></Route>
              <Route path="Addscreen" element={<AddScreen2 />} />
                <Route path="myscreens" element={<ViewMyScreens />} />  {/* Added this */}
                <Route path="profile" element={<AdvertisementForm />} />
                <Route path ="updateScreen/:id"element = {<UpdateMyScreen/>}></Route>
            </Route>
            

          
        </Routes>
        </div>
      </body>
    </>
  )
}

export default App
