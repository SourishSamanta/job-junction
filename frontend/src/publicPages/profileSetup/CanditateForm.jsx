import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const CandidateForm = () => {

  const [interests, setInterests] = useState(["Software Development", "Machine Learning"]);
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [certificates, setCertificates] = useState(["Certified JavaScript Developer"]);
  const [hobbies, setHobbies] = useState(["Reading", "Hiking", "Sleeping"]);
  const [languages, setLanguages] = useState(["English", "Spanish"]);
  const [interestInput, setInterestInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [hobbyInput, setHobbyInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [resume, setResume] = useState(null);
  const [preferredType, setPreferredType] = useState('Full-Time');

  const handleCreateProfile = async() => {
    console.log(interests, skills,
       certificates, hobbies, languages, interestInput,
       skillInput,
       hobbyInput,languageInput,
       resume,
       preferredType
    )
  }

  // Handlers for adding and deleting fields
  const handleAddInterest = (e) => {
    if (e.key === 'Enter' && interestInput.trim()) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

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
    setCertificates([...certificates, ...files.map(file => file.name)]);
  };


  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file ? file.name : null);
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-[90%] max-w-[1250px] h-[90%] shadow-xl border border-black/20 rounded-xl p-7 overflow-auto'>
        <h1 className='my-4 text-xl font-bold'>Personal Details:</h1>
        <TextField label="Username" variant="standard" defaultValue="testuser" fullWidth margin="normal" />
        <TextField label="Email" variant="standard" defaultValue="testuser@test.com" fullWidth margin="normal" />
        <TextField label="Current Job Title" variant="standard" defaultValue="Software Engineer" fullWidth margin="normal" />
        
        <TextField label="Portfolio" variant="standard" defaultValue="https://example.com/portfolio" fullWidth margin="normal" />
        <TextField label="Highest Degree Earned" variant="standard" defaultValue="Bachelor's" fullWidth margin="normal" />
        <TextField label="Field of Study" variant="standard" defaultValue="Computer Science" fullWidth margin="normal" />
        <TextField label="University" variant="standard" defaultValue="ABC University" fullWidth margin="normal" />
        <TextField label="Graduation Year" variant="standard" defaultValue="2027" fullWidth margin="normal" />
        <TextField label="Desired Salary" variant="standard" defaultValue="100000" fullWidth margin="normal" />
        <TextField label="About You" variant="standard" defaultValue="I am a passionate software developer with a keen interest in new technologies." fullWidth multiline margin="normal" />

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
              label={certificate}
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
      {resume && <p className="mt-2">Uploaded: {resume}</p>}

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
