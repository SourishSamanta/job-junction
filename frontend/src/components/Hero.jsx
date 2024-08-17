import React from 'react'
import { CiSearch } from "react-icons/ci";
import { BsPersonBoundingBox } from "react-icons/bs";

const Hero = () => {
  return (
    <div className=' h-[80vh] w-full flex flex-col items-center'>
        <div className='w-full  flex flex-col items-center pt-10'>
            <h1 className=' text-[4.5vw] font-bold'>Get The <span className=' text-blue-700'>Right Job</span></h1>
            <h1 className=' text-[4.5vw] font-bold -mt-5 mb-5'>You Deserve</h1>
            <p className=' font-bold text-black/50'>Make it easy to find your first job in <span className=' text-blue-700'>JOB JUNTION</span></p>
        </div>
        <div className=' flex items-center gap-5 mt-16'>
            <div className=' flex  p-3 items-center justify-center border border-black/30 rounded-full '>
                <CiSearch size={25} className=' mx-3' />
                <input type="text" placeholder='Search for Job' className="w-38 p-2  focus:border-none selection:border-none border-none"/>
            </div>
            <div className=' flex  p-5 items-center justify-center border border-black/30 rounded-full '>
                <BsPersonBoundingBox size={25} className=' mx-3'/>
                <select>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                </select>
            </div>
            <div className=' flex  p-5 items-center justify-center border border-black/30 rounded-full '>

            </div>
        </div>
    </div>
  )
}

export default Hero