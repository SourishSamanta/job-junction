import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Paper, Grid, Avatar, Button, Stack } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import InterestsIcon from '@mui/icons-material/Interests';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JobCard from '../Job/JobCard';
import { useUserData } from '../../contexts/userContext';

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const {userData, setUserData, jobPosts, setJobPosts} = useUserData();

  // const fetchJobPosts = async () => {
  //   const response = await axios.get(`${import.meta.env.VITE_API_URL}/job/my-jobs/${user.id}`);
  //   console.log(response);
    
  //   if (response.data.success === true) {
  //     setJobPosts(response.data.jobs)
  //   }
    
  //   else
  //   alert(response.data.message)
  // }

  // const fetchUserData = async () => {
  //   alert("hitting api")
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.id}`);
  //     if (response.data.success) {
  //       setUserData(response.data.data);
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  // useEffect(() => {

  //   if(!userData){
  //     fetchUserData();
      
  //   }
  //   fetchJobPosts();
  // }, [userData]);

  useEffect(() => {
    console.log(userData)
  },[userData])

  const renderFilePreview = (url) => {
    const fileExtension = url.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      return (
        <iframe
          src={url}
          style={{ width: '100%', height: '400px', border: 'none', marginTop: '20px' }}
          title="File Preview"
        />
      );
    } else if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      return (
        <img
          src={url}
          alt="File Preview"
          style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '20px' }}
        />
      );
    } else {
      return <Typography variant="body2">No preview available for this file type.</Typography>;
    }
  };

  return (
    <>
      {userData && (
        <Box sx={{ padding: 4 }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Grid container spacing={3}>
              {/* Profile Picture and Basic Info */}
              <Grid item xs={12} sm={4}>
                <Avatar src={userData.profilePicture} sx={{ width: 100, height: 100, marginBottom: 2 }}>
                  <AccountCircleIcon sx={{ fontSize: 80 }} />
                </Avatar>
                <Typography variant="h5">{userData.username}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData.currentJobTitle || userData.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userData.email}
                </Typography>
                {userData.email === user.primaryEmailAddress.emailAddress && (
                  <Stack spacing={2} sx={{
                    width: "200px"
                  }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/profile-edit/' + userData.clerkID)}
                    >
                      Edit Profile
                    </Button>
                    {userData.role === 'recruiter' && (
                      <Button variant="contained" onClick={() => {
                        navigate('/new-job')
                      }}>
                        Create new Job Post
                      </Button>
                    )}
                  </Stack>
                )}

              </Grid>

              {/* Detailed Info */}
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">About Me</Typography>
                {userData.role === 'recruiter' ? (<>
                  <Typography paragraph>{userData.additionalInformation || 'No description provided.'}</Typography>
                </>) : (<>
                  <Typography paragraph>{userData.aboutYou || 'No description provided.'}</Typography>

                </>)}

                {/* Conditional rendering based on role */}
                {userData.role === 'recruiter' ? (
                  <>
                    <Typography variant="h6">Company Details</Typography>
                    <Typography paragraph>
                      <BusinessIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                      {userData.companyName}, {userData.companySize}
                    </Typography>
                    <Typography paragraph>{userData.companyAddress}</Typography>
                    <Typography paragraph>{userData.companyWebsite}</Typography>

                    <Typography variant="h6">Job Categories</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                      {userData.jobCategories.map((category, index) => (
                        <Chip key={index} label={category} />
                      ))}
                    </Box>

                    <Typography variant="h6">Location Preferences</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                      {userData.locationPreferences.map((location, index) => (
                        <Chip key={index} label={location} icon={<LocationOnIcon />} />
                      ))}
                    </Box>

                    <Typography variant="h6">Contact Person</Typography>
                    <Typography paragraph>
                      <BusinessIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                      {userData.contactPersonName}, {userData.contactEmail && userData.contactEmail}
                    </Typography>



                    <Typography variant="h6">Hiring Process</Typography>
                    <Typography paragraph>{userData.hiringProcess || 'No details provided.'}</Typography>


                  </>
                ) : (
                  <>
                    <Typography variant="h6">Skills</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                      {userData.skills.length > 0 ? (
                        userData.skills.map((skill, index) => <Chip key={index} label={skill} />)
                      ) : (
                        <Typography variant="body2">No skills listed.</Typography>
                      )}
                    </Box>

                    <Typography variant="h6">Interests</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                      {userData.interests.length > 0 ? (
                        userData.interests.map((interest, index) => (
                          <Chip key={index} label={interest} icon={<InterestsIcon />} />
                        ))
                      ) : (
                        <Typography variant="body2">No interests listed.</Typography>
                      )}
                    </Box>

                    <Typography variant="h6">Education</Typography>
                    <Box sx={{ marginBottom: 2 }}>
                      <Typography variant="body1">
                        <SchoolIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                        {userData.highestDegreeEarned} in {userData.fieldOfStudy} from {userData.university} ({userData.graduationYear})
                      </Typography>
                    </Box>

                    <Typography variant="h6">Languages</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                      {userData.language.length > 0 ? (
                        userData.language.map((lang, index) => (
                          <Chip key={index} label={lang} icon={<LanguageIcon />} />
                        ))
                      ) : (
                        <Typography variant="body2">No languages listed.</Typography>
                      )}
                    </Box>

                    <Typography variant="h6">Hobbies</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                      {userData.hobbies.length > 0 ? (
                        userData.hobbies.map((hobby, index) => <Chip key={index} label={hobby} />)
                      ) : (
                        <Typography variant="body2">No hobbies listed.</Typography>
                      )}
                    </Box>

                    {/* Render Resume */}
                    {userData.resume && (
                      <>
                        <Typography variant="h6">Resume</Typography>
                        {renderFilePreview(userData.resume)}
                      </>
                    )}

                    {/* Render Certificates */}
                    {userData.certificates.length > 0 && (
                      <>
                        <Typography variant="h6">Certificates</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                          {userData.certificates.map((certificate, index) => (
                            <>
                              {renderFilePreview(certificate)}
                            </>

                          ))}
                        </Box>
                      </>
                    )}
                  </>

                )}
              </Grid>
            </Grid>
          </Paper>

          {userData.role === 'recruiter' && (
            <>
            <div style={{
              marginBottom : "10px"
            }}>

              
                  <Typography variant='h5' style={{ marginBottom: 16, marginTop : 15 }}>
                    My Job Posts
                  </Typography>

                  <Grid container spacing={2}>
                    {
                      jobPosts && (<>
                      {jobPosts.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <JobCard jobData = {item}/>
                      </Grid>
                    ))}
                      </>)
                    }
                  </Grid>
                
                    </div>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Profile;
