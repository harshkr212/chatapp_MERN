import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import  useAuthStore  from './store/useAuthStore'
import HomePage from './pages/HomePage'
import {Loader} from 'lucide-react'
import { Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import useThemeStore from './store/useThemeStore'
const App = () => {
  const {theme}=useThemeStore();
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth();
    

  },[checkAuth])
  console.log(authUser);
  console.log(theme);
  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className='size-10 animate-spin'/>
      </div>
    )

  }
  return (
    <div data-theme={theme}>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/"/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
      </Routes>
      <Navbar/>
      <Toaster/>
    </div>
  )
}

export default App
