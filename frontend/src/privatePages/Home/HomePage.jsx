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
    const [filters, setFilters] = useState({
        jobTitle: '',
        location: '',
        employmentType: '',
        experienceLevel: '',
        jobCategory: '',
        companyName: '',
        jobStatus: '',
        skills: '',
        preferredQualifications: '',
        salaryRange: '',
        datePosted: '',
      });
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

    

    const handleFilter = () => {
        console.log(filters)
        const filtered = jobs.filter(job => {
            // Check jobTitle
            if (filters.jobTitle && !job.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase())) {
              return false;
            }
            // Check location
            if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
              return false;
            }
            // Check employmentType
            if (filters.employmentType && job.employmentType !== filters.employmentType) {
              return false;
            }
            // Check experienceLevel
            if (filters.experienceLevel && job.experienceLevel.toLowerCase() !== filters.experienceLevel.toLowerCase()) {
              return false;
            }
            // Check jobCategory
            if (filters.jobCategory && job.jobCategory !== filters.jobCategory) {
              return false;
            }
            // Check companyName
            if (filters.companyName && !job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) {
              return false;
            }
            // Check jobStatus
            if (filters.jobStatus && job.jobStatus !== filters.jobStatus) {
              return false;
            }
            // Check skills (assuming skills is an array in job and a comma-separated string in filters)
            if (filters.skills) {
              const filterSkills = filters.skills.toLowerCase().split(',').map(skill => skill.trim());
              const jobSkills = job.skills.map(skill => skill.toLowerCase());
              if (!filterSkills.every(skill => jobSkills.includes(skill))) {
                return false;
              }
            }
            // Check preferredQualifications
            if (filters.preferredQualifications && !job.preferredQualifications.toLowerCase().includes(filters.preferredQualifications.toLowerCase())) {
              return false;
            }
            // Check salaryRange (assuming salaryRange is a string like '50000-100000')
            if (filters.salaryRange) {
              const [minSalary, maxSalary] = filters.salaryRange.split('-').map(Number);
              if (job.salary < minSalary || job.salary > maxSalary) {
                return false;
              }
            }
            // Check datePosted (assuming datePosted is a date string)
            console.log(new Date(job.postedAt))
            if (filters.datePosted && new Date(job.postedAt) < new Date(filters.datePosted)) {
              return false;
            }
      
            return true;
          });
          console.log(filtered)
        setFilteredJobs(filtered);
    };

    useEffect(() => {
        console.log(searchQuery)
        const searchedJobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if(searchedJobs.length !=0)
        setFilteredJobs(searchedJobs)
    },[searchQuery])

    return (
        <>
            <SearchComponent searchQuery={searchQuery} setsearchQuery={setsearchQuery} />
            <Grid container spacing={2}>
                <Grid item md={2}>
                    <FilterComponent filters={filters} setFilters={setFilters} handleFilter={handleFilter} />
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
