import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect } from 'react';
import {useUser} from "@clerk/clerk-react"

const Input = styled('input')({
  display: 'none',
});

const CandidateForm = () => {

  const {user} = useUser();

  const [interests, setInterests] = useState(["Software Development", "Machine Learning"]);
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [certificates, setCertificates] = useState([]);
  const [hobbies, setHobbies] = useState(["Reading", "Hiking", "Sleeping"]);
  const [languages, setLanguages] = useState(["English", "Spanish"]);
  const [interestInput, setInterestInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [hobbyInput, setHobbyInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [resume, setResume] = useState(null);
  const [preferredType, setPreferredType] = useState('Full-Time');
  const [username, setUsername] = useState(user.fullName);
  const [email, setEmail] = useState(user.primaryEmailAddress.emailAddress);
  const [currentjob, setCurrentJob] = useState();
  const [portfolio, setPortfolio] = useState();
  const [highestdegree, setHighestDegree] = useState();
  const [fieldStudy, setFieldStudy] = useState();
  const [university, setUniversity] = useState();
  const [desiredSalary, setDesiredSalary] = useState();
  const [aboutYou, setAboutYou] = useState();
  const [graduationYear, setGraduationYear] = useState();
    

  const handleCreateProfile = async() => {
    
    

    var resumeURL ;
    var certificateURL ;

    if(resume){
      //upload the resume
      const formData = new FormData();
      formData.append('file', resume);
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-single`,formData, config);
      if(response.data.success === true) {
        resumeURL = response.data.url;
      }
    }

    if(certificates){
      //upload the resume
      const formData = new FormData();
      for(const file of certificates){
        formData.append('files', file);
      }
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload-multiple` ,formData, config);
      console.log(response)
      if(response.data.success === true) {
        certificateURL = response.data.files;
      }
    }

    //saving user details
    const payload = {
      clerkID : user.id,
      username : username,
      email : email,
      currentJobTitle : currentjob,
      interests : interests,
      skills : skills,
      portfolio : portfolio,
      hobbies : hobbies,
      languages : languages,
      resume : resumeURL,
      highestDegreeEarned : highestdegree,
      fieldOfStudy : fieldStudy,
      university : university,
      graduationYear : graduationYear,
      desiredSalary : desiredSalary,
      aboutYou : aboutYou,
      interests : interests,
      skills : skills,
      certificates : certificateURL,
      hobbies : hobbies,
      preferredType : preferredType,
      language : languages,
      role : "candidate",
      profilePicture : user.imageUrl
    }

    //console.log(payload)

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/`, payload);
    if(response.data.success === true)
      alert(response.data.message)

    else
      alert(response.data.message)

  }

  // Handlers for adding and deleting fields
  const handleAddInterest = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const fetchPreviousData = async() => {
    const userID = localStorage.getItem('user_id');
    const userData = await axios.get(`${import.meta.env}/user/${userID}`);
    console.log(userID);
  }

  useEffect(() => {
    fetchPreviousData();
  },[])

  const handleDeleteInterest = (interestToDelete) => {
    setInterests(interests.filter(interest => interest !== interestToDelete));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleAddHobby = (e) => {
    if (e.key === 'Enter' && hobbyInput.trim()) {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput('');
    }
  };

  const handleDeleteHobby = (hobbyToDelete) => {
    setHobbies(hobbies.filter(hobby => hobby !== hobbyToDelete));
  };

  const handleAddLanguage = (e) => {
    if (e.key === 'Enter' && languageInput.trim()) {
      setLanguages([...languages, languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const handleDeleteLanguage = (languageToDelete) => {
    setLanguages(languages.filter(language => language !== languageToDelete));
  };

  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    setCertificates([...certificates, ...files.map(file => file)]);
  };


  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file ? file : null);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-[90%] max-w-[1250px] h-[90%] shadow-xl border border-black/20 rounded-xl p-7 overflow-auto'>
        <h1 className='my-4 text-xl font-bold'>Personal Details:</h1>
        <TextField onChange={(e) => {
          setUsername(e.target.value);
        }} label="Username" variant="standard" placeholder='Username' value={username} disabled fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setEmail(e.target.value)
        }} label="Email" variant="standard" placeholder='Email ID' value={email} disabled  fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setCurrentJob(e.target.value);
        }} label="Current Job Title" variant="standard" placeholder='Current Job' fullWidth margin="normal" />
        
        <TextField onChange={(e) => {
          setPortfolio(e.target.value)
        }} label="Portfolio" variant="standard" placeholder="https://example.com/portfolio" fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setHighestDegree(e.target.value)
        }} label="Highest Degree Earned" variant="standard" placeholder="Bachelor's" fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setFieldStudy(e.target.value)
        }} label="Field of Study" variant="standard" placeholder="Computer Science" fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setUniversity(e.target.value)
        }} label="University" variant="standard" placeholder="ABC University" fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setGraduationYear(e.target.value)
        }} label="Graduation Year" variant="standard" placeholder="2027" fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setDesiredSalary(e.target.value)
        }} label="Desired Salary" variant="standard" placeholder="100000" fullWidth margin="normal" />
        <TextField onChange={(e) => {
          setAboutYou(e.target.value)
        }} label="About You" variant="standard" placeholder="I am a passionate software developer with a keen interest in new technologies." fullWidth multiline margin="normal" />

        {/* Interests Section */}
        <h1 className='my-4 text-xl font-bold'>Interests:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {interests.map((interest, index) => (
            <Chip
              key={index}
              label={interest}
              onDelete={() => handleDeleteInterest(interest)}
              variant="outlined"
            />
          ))}
        </div>
        <TextField
          label="Add Interest"
          variant="standard"
          fullWidth
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyPress={handleAddInterest}
        />

        {/* Skills Section */}
        <h1 className='my-4 text-xl font-bold'>Skills:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
              variant="outlined"
            />
          ))}
        </div>
        <TextField
          label="Add Skill"
          variant="standard"
          fullWidth
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyPress={handleAddSkill}
        />

        {/* Certificates Section */}
        <h1 className='my-4 text-xl font-bold'>Certificates:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {certificates.map((certificate, index) => (
            <Chip
              key={index}
              label={certificate.name}
              variant="outlined"
            />
          ))}
        </div>
        <label htmlFor="certificate-upload">
          <Input
            accept="image/*,.pdf"
            id="certificate-upload"
            multiple
            type="file"
            onChange={handleCertificateUpload}
          />
          <Button variant="contained" component="span">
            Upload Certificates
          </Button>
        </label>

        {/* Hobbies Section */}
        <h1 className='my-4 text-xl font-bold'>Hobbies:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {hobbies.map((hobby, index) => (
            <Chip
              key={index}
              label={hobby}
              onDelete={() => handleDeleteHobby(hobby)}
              variant="outlined"
            />
          ))}
        </div>
        <TextField
          label="Add Hobby"
          variant="standard"
          fullWidth
          value={hobbyInput}
          onChange={(e) => setHobbyInput(e.target.value)}
          onKeyPress={handleAddHobby}
        />

        {/* Resume Upload Section */}
      <h1 className='my-4 text-xl font-bold'>Resume:</h1>
      <label htmlFor="resume-upload">
        <Input
          accept=".pdf,.doc,.docx"
          id="resume-upload"
          type="file"
          onChange={handleResumeUpload}
        />
        <Button variant="contained" component="span">
          Upload Resume
        </Button>
      </label>
      {resume && <p className="mt-2">Uploaded: {resume.name}</p>}

        {/* Preferred Type Section */}
        <h1 className='my-4 text-xl font-bold'>Preferred Type:</h1>
        <FormControl fullWidth margin="normal">
          <InputLabel style={{
            marginTop : "5px"
          }} id="preferred-type-label">Preferred Type</InputLabel>
          <Select
            labelId="preferred-type-label"
            id="preferred-type"
            value={preferredType}
            label="Preferred Type"
            onChange={(e) => setPreferredType(e.target.value)}
          >
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Freelancer">Freelancer</MenuItem>
          </Select>
        </FormControl>

        {/* Languages Section (as Skills) */}
        <h1 className='my-4 text-xl font-bold'>Languages:</h1>
        <div className='flex flex-wrap gap-2 mt-3'>
          {languages.map((language, index) => (
            <Chip
              key={index}
              label={language}
              onDelete={() => handleDeleteLanguage(language)}
              variant="outlined"
            />
          ))}
        </div>
        <TextField
          label="Add Language"
          variant="standard"
          fullWidth
          value={languageInput}
          onChange={(e) => setLanguageInput(e.target.value)}
          onKeyPress={handleAddLanguage}
        />


        <Button onClick={handleCreateProfile} style={{
          marginLeft : "94%",
          marginTop : "20px"
        }} variant='contained'>
          Next 
        </Button>
      </div>
    </div>
  );
};

export default CandidateForm;
