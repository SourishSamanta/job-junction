import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import Avatar from '@mui/material/Avatar';
import { IconButton } from "@mui/material";


const Nav = () => {
    const navigate = useNavigate();
    const { isSignedIn, user } = useUser();

    useEffect(() => {
      console.log(isSignedIn);
      console.log(user)
    }, [isSignedIn]);

    return (
        <div className="w-full h-[8vh] flex justify-between items-center px-6">
            <ul className="flex gap-8 items-center">
                <li className="text-2xl p-1 font-bold mr-20" style={{
                    cursor : "pointer"
                }} onClick={()=> {
                    navigate("/");
                }}>
                    JOB <span className="text-blue-700">JUNCTION</span>
                </li>
                <li className=" cursor-pointer" onClick={()=> {
                    navigate("/home");
                }}>Home</li>
                <li className=" cursor-pointer">Find Jobs</li>
                <li className=" cursor-pointer">Job Alerts</li>
                <li className=" cursor-pointer">Career Advice</li>
            </ul>
            <div className="flex items-center">
                {isSignedIn ? (
                  <>
                  <IconButton onClick={() => {
                    navigate('/profile')
                  }}>
                    <Avatar
                    alt={user.fullName}
                    src={user.imageUrl}
                    sx={{ width: 56, height: 56 }}
                    />
                    </IconButton>
                    </>
                ) : (
                    <>
                        <h1
                            className="text-[1.1vw] font-semibold"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Log in
                        </h1>
                        <button
                            className="text-[1.1vw] flex items-center py-2 px-5 ml-3 text-blue-700 border border-blue-700 rounded-full"
                            onClick={() => navigate("/register")}
                        >
                            Register Now
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Nav;
