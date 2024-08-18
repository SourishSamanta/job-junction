import React from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { FaPenNib } from "react-icons/fa6";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoWallet } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaSitemap } from "react-icons/fa6";

const SolutionSection = () => {
    const solutions = [
        {
            icon: <HiSpeakerphone size={40} className=" mt-2 mr-10" />,
            title: "Marketing & Communication",
        },
        {
            icon: <FaPenNib size={40} className=" mt-2 mr-10" />,
            title: "Design & Development",
        },
        {
            icon: <BsFillPersonLinesFill size={40} className=" mt-2 mr-10" />,
            title: "Human Research & Development",
        },
        {
            icon: <IoWallet size={40} className=" mt-2 mr-10" />,
            title: "Finance Management",
        },
        {
            icon: <MdOutlineSecurity size={40} className=" mt-2 mr-10" />,
            title: "Guide & Security",
        },
        {
            icon: <FaHandshake size={40} className=" mt-2 mr-10" />,
            title: "Business Consultancy",
        },
        {
            icon: <MdSupportAgent size={40} className=" mt-2 mr-10" />,
            title: "Customer Support Care",
        },
        {
            icon: <FaSitemap size={40} className=" mt-2 mr-10" />,
            title: "Project Management",
        },
    ];
    return (
        <div className=" w-full min-h-[80vh] flex flex-col items-center">
            <h1 className=" text-[2.8vw] font-bold">One Platform</h1>
            <h1 className=" text-[2.8vw] font-bold">
                Many <span className=" text-blue-700">Solution</span>
            </h1>
            <div className=" w-[80%] flex justify-center flex-wrap gap-8 gap-y-12 mt-20">
                {solutions.map((e) => {
                    return (
                        <div className="hover:bg-blue-700 hover:text-white transition-all cursor-pointer duration-300  rounded-xl border flex border-black/20 p-5 py-8 w-[20%] min-w-60">
                            <div>{e.icon}</div>
                            <div className=" flex flex-col">
                                <h1 className=" text-xl font-bold mb-1">
                                    {e.title}
                                </h1>
                                <p>99+ opportunities</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SolutionSection;
