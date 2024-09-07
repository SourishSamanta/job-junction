import React, { useEffect, useState } from 'react';
import { useUserData } from '../../contexts/userContext';
import axios from 'axios';
import { Grid, Stack } from '@mui/material';
import UserCard from './UserCard';
import JobCard from '../Job/JobCard';
import FilterComponent from './FilterComponent';
import SearchComponent from './SearchComponent';
import JobDetails from './JobDetails';
import EmployeeFilter from './EmployeeFilter';

function HomePage() {
    const { userData } = useUserData();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [currentJob, setCurrentJob] = useState();
    // const [filters, setFilters] = useState({
    //     employmentType: [],
    //     experienceLevel: '',
    //     location: '',
    //     jobCategory: [],
    //     salaryRange: '',
    // });
    const [currentEmployee , setCurrentEmployee] = useState();

    const [searchQuery, setsearchQuery] = useState('');


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
        const filtered = jobs.filter((job) => {
            // Apply your filtering logic here based on filters
            // Example:
            return (
                (filters.employmentType.length === 0 || filters.employmentType.includes(job.employmentType[0])) &&
                (filters.experienceLevel === '' || job.experienceLevel.includes(filters.experienceLevel)) &&
                (filters.location === '' || job.location.includes(filters.location)) &&
                (filters.jobCategory.length === 0 || filters.jobCategory.some(category => job.jobCategory.includes(category))) &&
                (filters.salaryRange === '' || job.salaryRange === filters.salaryRange)
            );
        });
        console.log(filtered)
        setFilteredJobs(filtered);
    };

    useEffect(() => {
        console.log(searchQuery)
        const searchedJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (searchedJobs.length != 0)
            setFilteredJobs(searchedJobs)
    }, [searchQuery])

    useEffect(() => {
        
    },[currentEmployee])

    return (
        <>
            {
                userData && userData.role === 'recruiter' ? (<>
                    <EmployeeFilter />
                    <Grid container>
                        {employees.map((item, index) => (
                           <>
                                    <UserCard setCurrentEmployee={setCurrentEmployee} user={item} />
                                    
                           </>
                                    
                        ))}
                    </Grid>
                </>) : (<>
                    <SearchComponent searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
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
                </>)
            }

        </>
    );
}

export default HomePage;
