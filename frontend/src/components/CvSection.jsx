import React from "react";
import man from "../assets/man.png";

const CvSection = () => {
    return (
        <div className=" w-full p-8 h-[80vh] flex items-center">
            <div className=" overflow-visible relative w-full h-[40vh] flex items-center justify-end p-20 px-44 bg-blue-700 rounded-2xl ">
                <img
                    src={man}
                    className=" absolute bottom-0 left-[4vw] h-[50vh]"
                    alt=""
                />
                <div>
                    <h1 className=" text-[2.8rem] font-semibold p-1 text-white">
                        You can upload your{" "}
                        <span className=" text-[3.2rem] font-bold">CV</span>{" "}
                    </h1>
                    <h1 className=" text-[2.8rem] font-semibold p-1 -mt-5 text-white">
                        For Better Experience
                    </h1>
                </div>
                <button className="ml-20 text-[1.1vw] flex items-center py-3 px-10  text-blue-700 bg-white border  rounded-xl ">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default CvSection;
