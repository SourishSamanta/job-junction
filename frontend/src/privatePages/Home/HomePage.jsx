import React, { useEffect, useState } from 'react'
import { useUserData } from '../../contexts/userContext'
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import UserCard from './UserCard';
import JobCard from '../Job/JobCard';

function HomePage() {

    const { userData, setUserData } = useUserData();
    const [jobs, setJobs] = useState();
    const [employees, setEmployees] = useState();

    async function fetchEmployees() {
        //for instance lets fetch all employees
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
        if (response.data.success === true) {
            setEmployees(response.data.data)
        }
        else
            alert(response.data.message)
    }

    async function fetchJobs() {
        //for instance fetch all jobs
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job`);
        if (response.data.success === true) {
            setJobs(response.data.data)
        }
        else
            alert(response.data.message)
    }

    useEffect(() => {
        if (userData) {
            userData.role === 'recruiter' ? fetchEmployees() : fetchJobs()
        }
    }, [userData])

    return (
        <>
            {userData && (<>
                {
                    userData.role === 'recruiter' ? (<>
                        {employees && (<>
                            <Grid container>

                                {
                                    employees.map((item, index) => {
                                        console.log(item)
                                        return (<>
                                            <div key={index}>
                                                <UserCard user={item} />
                                            </div>
                                        </>)
                                    })
                                }
                            </Grid>
                        </>)}
                    </>) : (<>
                        {jobs && (<>
                            <Grid container>

                                {jobs && (<>
                                    <Grid container spacing={2}>

                                        {
                                            jobs.map((item, index) => {
                                                console.log(item)
                                                return (<>
                                                    <div key={index}>
                                                        <JobCard jobData={item} />
                                                    </div>
                                                </>)
                                            })
                                        }
                                    </Grid>
                                </>)}
                            </Grid>
                        </>)}
                    </>)
                }
            </>)}
        </>
    )
}

export default HomePage