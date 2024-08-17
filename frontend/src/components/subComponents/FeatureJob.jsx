import React from 'react'

const FeatureJob = ({company,timing}) => {
  return (
    <div className=' h-[460px] w-[320px] border rounded-md bg-gradient-to-br from-slate-300 to-white '>
        <div className=' w-full flex  p-2'>
            <div className='w-12 mx-3 my-2 h-12 bg-slate-500'></div>
            <div className=' flex flex-col'>
                <h1 className=' text-xl font-semibold'>Microsoft</h1>
                <p>till 7th Sep</p>
            </div>
            
        </div>
        <div className=' flex flex-col w-full p-3'>
                <h1 className=' text-[2rem] p-1 font-bold'>Designer</h1>
        </div>
    </div>
  )
}

export default FeatureJob