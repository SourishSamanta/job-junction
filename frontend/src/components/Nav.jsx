import React from 'react'

const Nav = () => {
  return (
    <div className=' w-full h-[8vh] flex justify-between items-center px-6 '>
        <ul className=' flex gap-8 items-center'>
          <li className=' text-2xl p-1 font-bold mr-20'>JOB <span className=' text-blue-700'>JUNCTION</span></li>
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Job Alerts</li>
          <li>Career Advice</li>
        </ul>
        <div className=' flex items-center'>
          <h1 className=' text-[1.1vw] font-semibold'>Log in</h1>
          <button className='text-[1.1vw] flex items-center py-2 px-5 ml-3 text-blue-700 border border-blue-700 rounded-full border-black'>
            Register Now
          </button>
        </div>
    </div>
  )
}

export default Nav