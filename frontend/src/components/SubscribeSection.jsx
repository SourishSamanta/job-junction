import React from "react";

const SubscribeSection = () => {
    return (
        <div className="relative w-full h-[70vh] flex justify-center items-center flex-col">
            <div className="text absolute flex items-center justify-center flex-col">
                <h1 className=" text-[2.8rem] font-bold">Never Want to Miss</h1>
                <h1 className=" text-[2.8rem] font-bold">
                    Any <span className=" text-blue-700">Job News?</span>
                </h1>
            </div>
            <button className=" z-10 text-[1.1vw] flex items-center text-3xl  font-semibold py-3 px-10  text-white bg-blue-700 border hover:border-black hover:bg-white hover:text-black transition-all duration-300 rounded-xl ">
                Subscribe
            </button>

        </div>
    );
};

export default SubscribeSection;
