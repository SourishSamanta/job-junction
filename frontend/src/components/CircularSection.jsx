import React from 'react'
import FeatureJob from './subComponents/FeatureJob'

const CircularSection = () => {
  return (
    <div className=' w-full min-h-[100vh] flex flex-col items-center mt-32'>
        <h1 className=" text-[2.8vw] font-bold mb-16">
                <span className=" text-blue-700">Featured </span>
                 Job Circulars
        </h1>
        <div className=' flex flex-wrap p-4 w-[80%] gap-4 '>
            
            <FeatureJob />
            <FeatureJob />
            <FeatureJob />
            <FeatureJob />

            <FeatureJob />
            <FeatureJob />
            <FeatureJob />
            <FeatureJob />
            
        </div>
    </div>
  )
}

export default CircularSection