import React, { useState } from 'react';
import {
  Avatar, Button, Card, Chip, FormControl, Grid, InputLabel,
  MenuItem, Paper, Select, TextField, Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../contexts/userContext';

function CreateJobForm() {
  const {userData, setUserData} = useUserData();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState(userData.companyName);
  const [companyLocation, setCompanyLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [jobCategories, setJobCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [qualifications, setQualifications] = useState([]);
  const [qualificationInput, setQualificationInput] = useState('');
  const [preferredQualifications, setPreferredQualifications] = useState([]);
  const [preferredQualificationInput, setPreferredQualificationInput] = useState('');
  const [applicationValidDate, setApplicationValidDate] = useState(dayjs());
  const [companyLogo, setCompanyLogo] = useState(null);


  const handleAddChip = (setter, inputSetter, value) => {
    if (value.trim()) {
      setter(prev => [...prev, value]);
      inputSetter('');
    }
  };

  const handleDeleteChip = (setter, value) => {
    setter(prev => prev.filter(item => item !== value));
  };

  const handleJobPost = async () => {
    const myID = localStorage.getItem('user_id');
    const payload = {
      title: jobTitle,
      postedBy: myID,
      companyName: companyName,
      location: companyLocation,
      employmentType: employmentType,
      jobCategory: (jobCategories),
      salaryRange: `${minSalary}$ - ${maxSalary}$`,
      experienceLevel: experience,
      requiredSkills: (requiredSkills),
      jobDescription: jobDescription,
      responsibilities: jobResponsibilities,
      qualifications: (qualifications),
      preferredQualifications: (preferredQualifications),
      applicationDeadline: applicationValidDate.toISOString(),
    };
    if (companyLogo) {
      const formData_ = new FormData();
      formData_.append('file', companyLogo);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-single`,formData_, config);
      console.log(response)
      if(response.data.success === true) {
        payload.companyLogo = response.data.url
        //formData.append('companyLogo',response.data.url);
      }
      else
      alert(response.data.message)
    }
    
    console.log(payload)
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/job`,payload);
    console.log(res);

    

      
      if(res.data.success === true){
        alert(res.data.message)  
        navigate('/profile')
      }
      else
      alert(res.data.message)
    
    
    
  };

  return (
    <>
      <Card style={{ padding: '10px' }}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              onChange={(e) => setJobTitle(e.target.value)}
              variant='standard'
              label='Job title'
              placeholder='Backend Developer'
              fullWidth
            />

            <TextField
              onChange={(e) => setCompanyName(e.target.value)}
              variant='standard'
              label='Company name'
              placeholder='Google'
              fullWidth
              value={companyName}
              disabled
            />

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Avatar src={companyLogo ? URL.createObjectURL(companyLogo) : ''} />
              <Button variant='contained' component='label' style={{ marginLeft: '10px' }}>
                Select Company Logo
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={(e) => setCompanyLogo(e.target.files[0])}
                />
              </Button>
            </div>

            <TextField
              onChange={(e) => setCompanyLocation(e.target.value)}
              variant='standard'
              label='Company location'
              multiline
              placeholder='USA'
              fullWidth
            />

            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Employment type
            </Typography>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='preferred-type-label'>Preferred Type</InputLabel>
              <Select
                labelId='preferred-type-label'
                id='preferred-type'
                label='Preferred Type'
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <MenuItem value='Full-Time'>Full-Time</MenuItem>
                <MenuItem value='Part-Time'>Part-Time</MenuItem>
                <MenuItem value='Freelancer'>Freelancer</MenuItem>
              </Select>
            </FormControl>

            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Job Categories
            </Typography>
            <div className='flex flex-wrap gap-2 mt-3'>
              {jobCategories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  variant='outlined'
                  onDelete={() => handleDeleteChip(setJobCategories, category)}
                />
              ))}
            </div>
            <TextField
              label='Add category'
              variant='standard'
              fullWidth
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddChip(setJobCategories, setCategoryInput, categoryInput);
                }
              }}
            />

            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Salary Range
            </Typography>
            <div style={{ display: 'flex', marginTop: '10px', marginBottom: '10px' }}>
              <TextField
                onChange={(e) => setMinSalary(e.target.value)}
                variant='outlined'
                label='Minimum Salary($)'
                placeholder='10000'
                fullWidth
                style={{ marginRight: '10px' }}
              />
              <TextField
                onChange={(e) => setMaxSalary(e.target.value)}
                variant='outlined'
                label='Maximum Salary($)'
                placeholder='50000'
                fullWidth
              />
            </div>

            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Experience Level
            </Typography>
            <FormControl fullWidth margin='normal'>
              <InputLabel id='experience-level-label'>Select level</InputLabel>
              <Select
                labelId='experience-level-label'
                id='experience-level'
                label='Select level'
                onChange={(e) => setExperience(e.target.value)}
              >
                <MenuItem value='Entry-Level'>Entry-Level (0-2 years of experience)</MenuItem>
                <MenuItem value='Mid-Level'>Mid level (3-5 years of experience)</MenuItem>
                <MenuItem value='Senior'>Senior (5+ years of experience)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Required Skills
            </Typography>
            <div className='flex flex-wrap gap-2 mt-3'>
              {requiredSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant='outlined'
                  onDelete={() => handleDeleteChip(setRequiredSkills, skill)}
                />
              ))}
            </div>
            <TextField
              label='Add skill'
              variant='standard'
              fullWidth
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddChip(setRequiredSkills, setSkillInput, skillInput);
                }
              }}
            />

            <TextField
              onChange={(e) => setJobDescription(e.target.value)}
              variant='standard'
              multiline
              rows={4}
              label='Job description'
              placeholder='Job description'
              fullWidth
              style={{ marginTop: '15px' }}
            />

            <TextField
              onChange={(e) => setJobResponsibilities(e.target.value)}
              variant='standard'
              multiline
              rows={4}
              label='Responsibilities'
              placeholder='Job responsibilities'
              fullWidth
              style={{ marginTop: '15px' }}
            />

            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Qualifications
            </Typography>
            <div className='flex flex-wrap gap-2 mt-3'>
              {qualifications.map((qualification, index) => (
                <Chip
                  key={index}
                  label={qualification}
                  variant='outlined'
                  onDelete={() => handleDeleteChip(setQualifications, qualification)}
                />
              ))}
            </div>
            <TextField
              label='Add qualification'
              variant='standard'
              fullWidth
              value={qualificationInput}
              onChange={(e) => setQualificationInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddChip(setQualifications, setQualificationInput, qualificationInput);
                }
              }}
            />

            <Typography style={{ marginTop: '15px' }} variant='h5'>
              Preferred Qualifications
            </Typography>
            <div className='flex flex-wrap gap-2 mt-3'>
              {preferredQualifications.map((qualification, index) => (
                <Chip
                  key={index}
                  label={qualification}
                  variant='outlined'
                  onDelete={() => handleDeleteChip(setPreferredQualifications, qualification)}
                />
              ))}
            </div>
            <TextField
              label='Add preferred qualification'
              variant='standard'
              fullWidth
              value={preferredQualificationInput}
              onChange={(e) => setPreferredQualificationInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddChip(setPreferredQualifications, setPreferredQualificationInput, preferredQualificationInput);
                }
              }}
            />

            <div style={{ marginTop: '15px' }}>
              <Typography variant='h5'>Application Validity Date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Select Date'
                  value={applicationValidDate}
                  onChange={(newValue) => setApplicationValidDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </div>

            <Button
              variant='contained'
              color='primary'
              onClick={handleJobPost}
              style={{ marginTop: '20px' }}
            >
              Post Job
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default CreateJobForm;
