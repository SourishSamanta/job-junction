import { Avatar, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';

function JobCard({ jobData, currentJob, setCurrentJob }) {
    function TruncateText(text) {
        const maxLength = 800;
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    return (
        <Card  sx={{ borderRadius: 2, overflow: 'hidden', width: '100%', height: 250 }}>
            <CardActionArea sx={{ height: '100%' }} onClick={()=>{
                setCurrentJob(jobData._id)
            }}>
                <CardContent sx={{ display: 'flex', alignItems: 'start', height: '100%' }}>
                    <Avatar 
                        src={jobData.companyLogo} 
                        alt={jobData.companyName} 
                        sx={{ width: 56, height: 56, mr: 2 }} 
                    />
                    <div>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {jobData.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                            {jobData.companyName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {TruncateText(jobData.jobDescription)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {jobData.salaryRange}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default JobCard;
