import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './publicPages/landingPage/LandingPage'
import Profile from './privatePages/profile/Profile'
import Login from './publicPages/authPages/Login'
import Signup from './publicPages/authPages/Signup'
import ProtectedRoute from './publicPages/authPages/ProtectedRoute'
import ChooseRole from './publicPages/profileSetup/ChooseRole'
import CanditateForm from './publicPages/profileSetup/CanditateForm'
import RecruiterForm from './publicPages/profileSetup/RecruiterForm'
import Nav from './components/Nav'
import EditProfile from './privatePages/profile/EditProfile'
import CreateJobForm from './privatePages/Job/CreateJobForm'
import HomePage from './privatePages/Home/HomePage'
import EmployeeDetails from './privatePages/Home/EmployeeDetails'

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<LandingPage />} ></Route>
        <Route exact path="/profile" element={<ProtectedRoute>

          <Profile />

        </ProtectedRoute>} ></Route>

        <Route exact path="/profile-edit/:id" element={<ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>} ></Route>

        <Route exact path="/new-job" element={<ProtectedRoute>
          <CreateJobForm />
        </ProtectedRoute>} ></Route>

        <Route exact path="/:id" element={<ProtectedRoute>
          <EmployeeDetails />
        </ProtectedRoute>} ></Route>

        <Route exact path="/home" element={<ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} ></Route>


        <Route exact path="/login" element={<Login />} ></Route>
        <Route exact path="/signup" element={<Signup />} ></Route>

        <Route exact path="setup/chooseRole" element={<ChooseRole />} ></Route>
        <Route exact path="setup/candidateForm" element={<CanditateForm />} ></Route>
        <Route exact path="setup/recruiterForm" element={<RecruiterForm />} ></Route>


      </Routes>
    </>
  )
}

export default App