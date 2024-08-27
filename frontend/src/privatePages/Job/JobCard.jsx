import { Avatar, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

function JobCard({ jobData }) {

    function TruncateText(text) {
        const maxLength = 80;
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    return (
        <Card elevation={4} sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 500, maxHeight : 500 }}>
            <CardActionArea>
                <CardContent sx={{ display: 'flex', alignItems: 'start' }}>
                    <Avatar 
                        src={jobData.companyLogo} 
                        alt={jobData.companyName} 
                        sx={{ width: 56, height: 56, mr: 2 }} 
                    />
                    <div>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
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
