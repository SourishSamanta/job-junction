import React from 'react'

const FeatureJob = ({company,timing}) => {
  return (
    <div className=' h-[400px] w-[320px] justify-between flex flex-col shadow-2xl rounded-md bg-gradient-to-br from-slate-300 to-white '>
        <div>
        <div className=' w-full flex  p-2'>
            <div className='w-12 mx-3 my-2 h-12 bg-slate-500'></div>
            <div className=' flex flex-col'>
                <h1 className=' text-xl font-semibold'>Microsoft</h1>
                <p className=''>till 7th Sep</p>
            </div>
            
        </div>
        <div className=' flex flex-col w-full p-3'>
                <h1 className=' text-[2rem] p-1 font-bold'>Designer</h1>
                <p className=' opacity-75 mb-7'>Full-Time</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, earum dolore? Pariatur?</p>
        </div>
        </div>
        <div className=' flex p-4 justify-between py-7'>
          <h1 className=' text-2xl font-bold'>1 lakh/mo</h1>
          <button className=' rounded-md bg-blue-700 text-white px-4 py-2 text-xl'>Apply</button>
        </div>
    </div>
  )
}

export default FeatureJob