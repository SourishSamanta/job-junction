import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Stack, CardActionArea } from '@mui/material';

// Define the UserCard component
function UserCard({ user }) {
  return (
    <Card sx={{ maxWidth: 345, margin: '1rem', boxShadow: 3 }}>
        <CardActionArea>

      <CardContent>
        {/* User Profile Picture */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 56, height: 56 }} src={user.profilePicture || ''}>
            {user.username[0]}
          </Avatar>
          <Typography variant="h6" component="div">
            {user.username}
          </Typography>
        </Stack>

        {/* User Details */}
        <Typography variant="body2" color="text.secondary" mt={2}>
          {user.currentJobTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>

        {/* User Skills */}
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {user.skills.slice(0, 3).map((skill, index) => (
              <Chip key={index} label={skill} variant="outlined" />
          ))}
        </Stack>
      </CardContent>
              </CardActionArea>
    </Card>
  );
}

export default UserCard;
