import React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import employee from "../../assets/employee.gif";
import recruiter from "../../assets/recruiter.gif";

const ChooseRole = () => {
    return (
        <div className=" w-screen h-screen flex items-center justify-center">
            <div className=" max-w-[900px] w-[85%] h-[70%] flex flex-col bg-slate-100 items-center p-5 rounded-xl shadow-2xl shadow-black/50 border border-black/20">
                <h1 className=" text-[2vw] font-bold">
                    Choose Your <span className=" text-blue-700">Role!</span>
                </h1>
                <div className=" w-full flex flex-1 items-center justify-evenly p-5">
                    <Card
                        className=" flex flex-col items-center shadow-xl shadow-black/20"
                        variant="outlined"
                        sx={{ maxWidth: 345, maxHeight: 345 }}
                    >
                        <CardActionArea>
                            <div className=" h-60 w-60">
                                <img src={employee} alt="" />
                            </div>
                            <div className=" w-full flex justify-center">
                                <h1 className=" text-[1.3rem] font-bold m-2">
                                    Employee
                                </h1>
                            </div>
                        </CardActionArea>
                    </Card>

                    <Card
                        className=" flex flex-col items-center  shadow-xl shadow-black/20"
                        variant="outlined"
                        sx={{ maxWidth: 345, maxHeight: 345 }}
                    >
                        <CardActionArea>
                            <div className=" h-60 w-60 flex items-center justify-center">
                                <img src={recruiter} alt="" />
                            </div>
                            <div className=" w-full flex justify-center">
                                <h1 className=" text-[1.3rem] font-bold m-2">
                                    Recruiter
                                </h1>
                            </div>
                        </CardActionArea>
                        
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ChooseRole;
