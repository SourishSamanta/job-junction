import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './publicPages/landingPage/LandingPage'
import Profile from './privatePages/profile/Profile'
import Login from './publicPages/authPages/Login'
import Signup from './publicPages/authPages/Signup'
import ProtectedRoute from './publicPages/authPages/ProtectedRoute'

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>} ></Route>
      <Route exact path="/profile" element={<ProtectedRoute>

        <Profile/>

      </ProtectedRoute>} ></Route>
      <Route exact path="/login" element={<Login/>} ></Route>
      <Route exact path="/signup" element={<Signup/>} ></Route>
      
      
    </Routes>
  )
}

export default App