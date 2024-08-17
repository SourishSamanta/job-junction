import React from 'react'
import FeatureJob from './subComponents/FeatureJob'

const CircularSection = () => {
  return (
    <div className=' w-full min-h-[100vh] flex flex-col items-center mt-32'>
        <h1 className=" text-[2.8vw] font-bold">
                <span className=" text-blue-700">Featured </span>
                 Job Circulars
        </h1>
        <div className=' flex flex-wrap'>
            <FeatureJob />
        </div>
    </div>
  )
}

export default CircularSection