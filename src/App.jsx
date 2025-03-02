import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { UserSidebar } from './components/layouts/UserSidebar'
import { UserProfile } from './components/user/UserProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSignUp from './components/common/LoginSignUp'
import { DemoSidebar } from './components/admin/DemoSidebar'
import { Demo } from './components/admin/Demo'
import { AgencySidebar } from './components/layouts/AgencySidebar'
import { AdvertisementForm } from './components/user/agency/AdvertisementForm'
import axios from "axios";
function App() {
  const [count, setCount] = useState(0)
   axios.defaults.baseURL = "http://localhost:3000"

  return (
    <>
    <Routes>
    <Route path='/login' element={<LoginSignUp />} ></Route>
    
    </Routes>
      <body class="layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded">
        <div className='app-wrapper'>
        <Routes>
          
          <Route path='/user' element={<UserSidebar />} >
            <Route path='profile' element={<UserProfile />}></Route>
          </Route>
          <Route path='/DemoUser' element={<DemoSidebar />} >
            <Route path='profile' element={<Demo/>}></Route>
          </Route>
          <Route path='/AgencyUser' element={<AgencySidebar />} >
            <Route path='profile' element={<AdvertisementForm/>}></Route>
          </Route>
          
        </Routes>
        </div>
      </body>
    </>
  )
}

export default App
