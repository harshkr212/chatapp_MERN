import React from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
      <Navbar/>
      
    </div>
  )
}

export default App
