import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography, Chip } from '@mui/material';
import axios from 'axios';

function JobDetails({ jobId }) {
    const [job, setJob] = useState(null);

    useEffect(() => {
        async function fetchJobDetails() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/job/${jobId}`);
                if (response.data.success) {
                    setJob(response.data.data);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        }

        fetchJobDetails();
    }, [jobId]);

    const handleApply = () => {
        // Add apply logic here
        alert('Applied for the job!');
    };

    const handleSave = () => {
        // Add save logic here
        alert('Job saved!');
    };

    if (!job) return <Typography variant="h6">Loading...</Typography>;

    return (
        <Box sx={{ padding: 3 }}>
            <Card elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                            src={job.companyLogo} 
                            alt={job.companyName} 
                            sx={{ width: 56, height: 56, mr: 2 }} 
                        />
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {job.title}
                        </Typography>
                    </Box>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        {job.companyName}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                        <strong>Location:</strong> {job.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Description:</strong> {job.jobDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Responsibilities:</strong>
                        <ul>
                            {job.responsibilities.split('\n').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Qualifications:</strong>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {job.qualifications.map((qual, index) => (
                                <>
                                {console.log(typeof qual)}
                                <Chip key={index} label={qual} />
                                </>
                            ))}
                        </Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Preferred Qualifications:</strong>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {job.preferredQualifications.map((pref, index) => (
                                <Chip key={index} label={pref} />
                            ))}
                        </Box>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Salary Range:</strong> {job.salaryRange}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleApply}>
                            Apply
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default JobDetails;
