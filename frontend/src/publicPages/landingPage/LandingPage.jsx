import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  
  const navigate = useNavigate();
  
  return (
    <>
    <div>LandingPage</div>
    <button onClick={(e)=>{
      e.preventDefault();
      navigate('/profile')
    }}>Get started</button>
    </>
  )
}

export default LandingPage