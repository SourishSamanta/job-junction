import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";

const Input = styled('input')({
  display: 'none',
});

const RecruiterForm = () => {
  const { user } = useUser();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [jobCategories, setJobCategories] = useState(["Software Development", "Machine Learning"]);
  const [industryTypes, setIndustryTypes] = useState(["Technology", "Finance"]);
  const [locationPreferences, setLocationPreferences] = useState(["Remote", "On-Site"]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [employmentType, setEmploymentType] = useState('Full-Time');
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPersonEmail, setContactPersonEmail] = useState('');
  const [hiringProcess, setHiringProcess] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [resume, setResume] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [jobCategoryInput, setJobCategoryInput] = useState('');
  const [industryTypeInput, setIndustryTypeInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [socialLinkInput, setSocialLinkInput] = useState('');

  useEffect(() => {
    setUsername(user.fullName);
    setEmail(user.primaryEmailAddress.emailAddress)
  },[user])


  const handleCreateProfile = async () => {
    let resumeURL = null;
    let certificateURLs = [];

    if (resume) {
      const formData = new FormData();
      formData.append('file', resume);
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-single`, formData, config);
      if (response.data.success) {
        resumeURL = response.data.url;
      }
    }

    if (certificates.length > 0) {
      const formData = new FormData();
      certificates.forEach(file => formData.append('files', file));
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-multiple`, formData, config);
      if (response.data.success) {
        certificateURLs = response.data.files;
      }
    }

    const payload = {
      clerkID: user.id,
      username: user.fullName,
      fullName : user.fullName,
      email: user.primaryEmailAddress.emailAddress,
      companyName,
      companyWebsite,
      companyAddress,
      companySize,
      contactPersonName,
      contactPersonEmail,
      hiringProcess,
      aboutUs,
      jobCategories,
      industryTypes,
      locationPreferences,
      socialLinks,
      resume: resumeURL,
      certificates: certificateURLs,
      employmentType,
      role: "recruiter",
      profilePicture: user.imageUrl,
      additionalInformation : aboutUs
    };

    console.log('Payload:', payload);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/`, payload);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile.');
    }
  };

  const handleAddChip = (e, setter, input, setInput) => {
    if (e.key === 'Enter' && input.trim()) {
      setter(prev => [...prev, input.trim()]);
      setInput('');
    }
  };

  const handleDeleteChip = (itemToDelete, setter) => {
    setter(prev => prev.filter(item => item !== itemToDelete));
  };

  const handleFileUpload = (e, setter) => {
    const files = Array.from(e.target.files);
    setter(prev => [...prev, ...files]);
  };

  useEffect(() => {
    // Fetch previous data if needed
  }, []);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-[90%] max-w-[1250px] h-[90%] shadow-xl border border-black/20 rounded-xl p-7 overflow-auto'>
        <h1 className='my-4 text-xl font-bold'>Recruiter Details:</h1>

        <TextField disabled label="Username" variant="standard" value={username} p fullWidth margin="normal" onChange={(e) => setCompanyName(e.target.value)} />
        <TextField disabled label="Email" variant="standard" value={email}  fullWidth margin="normal" onChange={(e) => setCompanyWebsite(e.target.value)} />

        <TextField label="Company Name" variant="standard" placeholder='Company Name' fullWidth margin="normal" onChange={(e) => setCompanyName(e.target.value)} />
        <TextField label="Company Website" variant="standard" placeholder="https://example.com" fullWidth margin="normal" onChange={(e) => setCompanyWebsite(e.target.value)} />
        <TextField label="Company Address" variant="standard" placeholder="123 Main St" fullWidth margin="normal" onChange={(e) => setCompanyAddress(e.target.value)} />
        <TextField label="Company Size" variant="standard" placeholder="Startup, Small, Medium, Large" fullWidth margin="normal" onChange={(e) => setCompanySize(e.target.value)} />
        <TextField label="Contact Person Name" variant="standard" placeholder="John Doe" fullWidth margin="normal" onChange={(e) => setContactPersonName(e.target.value)} />
        <TextField label="Contact Person Email" variant="standard" placeholder="john@example.com" fullWidth margin="normal" onChange={(e) => setContactPersonEmail(e.target.value)} />

        <h1 className='my-4 text-xl font-bold'>Job Categories:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {jobCategories.map((category, index) => (
            <Chip key={index} label={category} onDelete={() => handleDeleteChip(category, setJobCategories)} variant="outlined" />
          ))}
        </div>
        <TextField label="Add Job Category" variant="standard" fullWidth value={jobCategoryInput} onChange={(e) => setJobCategoryInput(e.target.value)} onKeyPress={(e) => handleAddChip(e, setJobCategories, jobCategoryInput, setJobCategoryInput)} />

        <h1 className='my-4 text-xl font-bold'>Industry Types:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {industryTypes.map((industry, index) => (
            <Chip key={index} label={industry} onDelete={() => handleDeleteChip(industry, setIndustryTypes)} variant="outlined" />
          ))}
        </div>
        <TextField label="Add Industry Type" variant="standard" fullWidth value={industryTypeInput} onChange={(e) => setIndustryTypeInput(e.target.value)} onKeyPress={(e) => handleAddChip(e, setIndustryTypes, industryTypeInput, setIndustryTypeInput)} />

        <h1 className='my-4 text-xl font-bold'>Location Preferences:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {locationPreferences.map((location, index) => (
            <Chip key={index} label={location} onDelete={() => handleDeleteChip(location, setLocationPreferences)} variant="outlined" />
          ))}
        </div>
        <TextField label="Add Location" variant="standard" fullWidth value={locationInput} onChange={(e) => setLocationInput(e.target.value)} onKeyPress={(e) => handleAddChip(e, setLocationPreferences, locationInput, setLocationInput)} />

        <h1 className='my-4 text-xl font-bold'>Social Links:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {socialLinks.map((link, index) => (
            <Chip key={index} label={link} onDelete={() => handleDeleteChip(link, setSocialLinks)} variant="outlined" />
          ))}
        </div>
        <TextField label="Add Social Link" variant="standard" fullWidth value={socialLinkInput} onChange={(e) => setSocialLinkInput(e.target.value)} onKeyPress={(e) => handleAddChip(e, setSocialLinks, socialLinkInput, setSocialLinkInput)} />

        <h1 className='my-4 text-xl font-bold'>Employment Type:</h1>
        <FormControl fullWidth margin="normal">
          <InputLabel id="employment-type-label">Employment Type</InputLabel>
          <Select labelId="employment-type-label" id="employment-type" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Freelancer">Freelancer</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Hiring Process" multiline variant="standard" placeholder="Describe the hiring process" fullWidth margin="normal" onChange={(e) => setHiringProcess(e.target.value)} />
        <TextField label="About Us" multiline variant="standard" placeholder="Describe your company" fullWidth margin="normal" onChange={(e) => setAboutUs(e.target.value)} />

       

        <Button variant="contained" color="primary" fullWidth onClick={handleCreateProfile}>Create Profile</Button>
      </div>
    </div>
  );
};

export default RecruiterForm;
