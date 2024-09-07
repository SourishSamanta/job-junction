import React, { useEffect } from 'react';
import { Avatar, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useUserData } from '../../contexts/userContext';

function EmployeeDetails() {
  const { currentEmployee } = useUserData(); // Access the current employee data from context

useEffect(() => {
    console.log(currentEmployee)
},[currentEmployee])

  if (!currentEmployee) {
    return <Typography variant="body2">Loading...</Typography>; // Loading state
  }

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden', width: '100%', height: 'auto', mb: 2 }}>
      <CardActionArea>
        <CardContent sx={{ display: 'flex', alignItems: 'start' }}>
          {/* Employee Avatar */}
          <Avatar
            src={currentEmployee.profilePicture}
            alt={currentEmployee.username}
            sx={{ width: 56, height: 56, mr: 2 }}
          />

          {/* Employee Details */}
          <div>
            {/* Full Name */}
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {currentEmployee.username}
            </Typography>

            {/* Role */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {currentEmployee.role}
            </Typography>

            {/* Company Name */}
            {currentEmployee.companyName && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Company: {currentEmployee.companyName}
              </Typography>
            )}

            {/* Company Website */}
            {currentEmployee.companyWebsite && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Website: <a href={currentEmployee.companyWebsite} target="_blank" rel="noopener noreferrer">{currentEmployee.companyWebsite}</a>
              </Typography>
            )}

            {/* Job Categories */}
            {currentEmployee.jobCategories.length > 0 && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Job Categories: {currentEmployee.jobCategories.join(', ')}
              </Typography>
            )}

            {/* Location Preferences */}
            {currentEmployee.locationPreferences.length > 0 && (
              <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
                Location Preferences: {currentEmployee.locationPreferences.join(', ')}
              </Typography>
            )}

            {/* Email */}
            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 'bold' }}>
              Contact: {currentEmployee.email}
            </Typography>

            {/* Additional Fields */}
            {currentEmployee.additionalInformation && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                {currentEmployee.additionalInformation}
              </Typography>
            )}

            {/* Display more fields as needed */}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default EmployeeDetails;
