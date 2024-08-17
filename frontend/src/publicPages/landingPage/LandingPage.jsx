import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Hero from '../../components/Hero';
import SolutionSection from '../../components/SolutionSection';
import CircularSection from '../../components/CircularSection';

const LandingPage = () => {
  
  const navigate = useNavigate();
  
  return (
    <>
    <div className=' w-screen overflow-x-hidden'>
        <Nav />
        <Hero />
        <SolutionSection />
        <CircularSection />
    </div>
    {/* <button onClick={(e)=>{
      e.preventDefault();
      navigate('/profile')
    }}>Get started</button> */}
    </>
  )
}

export default LandingPage