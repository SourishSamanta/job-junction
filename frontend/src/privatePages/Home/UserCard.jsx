import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Stack, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../contexts/userContext';

// Define the UserCard component
function UserCard({ user }) {

  // Move TruncateText function inside the component or use it directly
  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const navigate = useNavigate();
  const {currentEmployee, setCurrentEmployee} = useUserData();

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem', boxShadow: 3 }}>
      <CardActionArea onClick={()=>{
        setCurrentEmployee(user)
        navigate('/employee');
      }}>
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
          <Typography variant="body2" color="text.secondary">
            {truncateText(user.aboutYou, 100)} {/* Apply truncation here */}
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
