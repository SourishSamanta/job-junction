import React, { useEffect, useState } from 'react';
import { useUserData } from '../../contexts/userContext';
import axios from 'axios';
import { Grid, Stack } from '@mui/material';
import UserCard from './UserCard';
import JobCard from '../Job/JobCard';
import FilterComponent from './FilterComponent';
import SearchComponent from './SearchComponent';
import JobDetails from './JobDetails';

function HomePage() {
    const { userData } = useUserData();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [currentJob, setCurrentJob] = useState();

    async function fetchEmployees() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
        if (response.data.success === true) {
            setEmployees(response.data.data);
        } else {
            alert(response.data.message);
        }
    }

    async function fetchJobs() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job`);
        if (response.data.success === true) {
            setJobs(response.data.data);
            setFilteredJobs(response.data.data); // Set the filteredJobs to all jobs initially
            setCurrentJob(response.data.data[0]._id);
        } else {
            alert(response.data.message);
        }
    }

    useEffect(() => {
        if (userData) {
            if (userData.role === 'recruiter') {
                fetchEmployees();
            } else {
                fetchJobs();
            }
        }
    }, [userData]);

    const handleFilter = (filters) => {
        console.log(filters)
        const filtered = jobs.filter(job => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                if (key === 'salaryRange') {
                    // Assuming salaryRange is in format "20k - 40k"
                    const [min, max] = filters.salaryRange.split(' - ').map(s => parseInt(s.replace('k', '')) * 1000);
                    const jobSalary = parseInt(job.salary.replace('k', '')) * 1000; // Assuming job.salary is in format "40k"
                    return jobSalary >= min && jobSalary <= max;
                } else if (key === 'datePosted') {
                    // Assuming datePosted is in format "Last 7 days"
                    const days = parseInt(filters.datePosted.split(' ')[1]);
                    const dateThreshold = new Date();
                    dateThreshold.setDate(dateThreshold.getDate() - days);
                    return new Date(job.datePosted) >= dateThreshold;
                }
                return job[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        setFilteredJobs(filtered);
    };

    return (
        <>
            <SearchComponent />
            <Grid container spacing={2}>
                <Grid item md={2}>
                    <FilterComponent onFilter={handleFilter} />
                </Grid>

                <Grid item md={5}>
                    {userData && (
                        <>
                            {userData.role === 'recruiter' ? (
                                <>
                                    {employees && (
                                        <Grid container>
                                            {employees.map((item, index) => (
                                                <div key={index}>
                                                    <UserCard user={item} />
                                                </div>
                                            ))}
                                        </Grid>
                                    )}
                                </>
                            ) : (
                                <>
                                    {filteredJobs && (
                                        <Stack spacing={2}>
                                            {filteredJobs.map((item, index) => (
                                                <JobCard currentJob={currentJob} setCurrentJob={setCurrentJob} key={index} jobData={item} />
                                            ))}
                                        </Stack>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </Grid>

                <Grid item md={5}>
                    {currentJob ? (
                        <JobDetails jobId={currentJob} />
                    ) : (
                        <>Loading...</>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default HomePage;
