import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Paper, Grid, Avatar, Button, TextField } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import InterestsIcon from '@mui/icons-material/Interests';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const EditProfile = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [skillInput, setSkillInput] = useState('');
    const [hobbyInput, setHobbyInput] = useState('');
    const [languageInput, setLanguageInput] = useState('');
    const [interestInput, setInterestInput] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [certificates, setCertificates] = useState([]);

    const fetchUserData = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.id}`);
        if (response.data.success === true) {
            setUserData(response.data.data);
        } else {
            alert(response.data.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleFileChange = (e, type) => {
        if (type === 'profileImage') setProfileImage(e.target.files[0]);
        if (type === 'resume') setResume(e.target.files[0]);
        if (type === 'certificates') setCertificates([...e.target.files]);
    };

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

    const handleDeleteSkill = (skillToDelete) => {
        setUserData((prevState) => ({
            ...prevState,
            skills: prevState.skills.filter((skill) => skill !== skillToDelete),
        }));
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            setUserData((prevState) => ({
                ...prevState,
                skills: [...prevState.skills, skillInput.trim()],
            }));
            setSkillInput('');
        }
    };

    const handleDeleteInterest = (interestToDelete) => {
        setUserData((prevState) => ({
            ...prevState,
            interests: prevState.interests.filter((interest) => interest !== interestToDelete),
        }));
    };

    const handleAddInterest = (e) => {
        if (e.key === 'Enter' && interestInput.trim()) {
            setUserData((prevState) => ({
                ...prevState,
                interests: [...prevState.interests, interestInput.trim()],
            }));
            setInterestInput('');
        }
    };

    const handleDeleteHobby = (hobbyToDelete) => {
        setUserData((prevState) => ({
            ...prevState,
            hobbies: prevState.hobbies.filter((hobby) => hobby !== hobbyToDelete),
        }));
    };

    const handleAddHobby = (e) => {
        if (e.key === 'Enter' && hobbyInput.trim()) {
            setUserData((prevState) => ({
                ...prevState,
                hobbies: [...prevState.hobbies, hobbyInput.trim()],
            }));
            setHobbyInput('');
        }
    };

    const handleDeleteLanguage = (languageToDelete) => {
        setUserData((prevState) => ({
            ...prevState,
            language: prevState.language.filter((lang) => lang !== languageToDelete),
        }));
    };

    const handleAddLanguage = (e) => {
        if (e.key === 'Enter' && languageInput.trim()) {
            setUserData((prevState) => ({
                ...prevState,
                language: [...prevState.language, languageInput.trim()],
            }));
            setLanguageInput('');
        }
    };

    const handleSaveChanges = () => {
        const updatedData = {
            ...userData,
            profileImage,
            resume,
            certificates,
        };
        console.log('Final edited data:', updatedData);
        alert("this feature is still under progress")
        // Send updatedData to backend API
    };

    return (
        <>
            {userData != null && (
                <Box sx={{ padding: 4 }}>
                    <Paper elevation={3} sx={{ padding: 4 }}>
                        <Grid container spacing={3}>
                            {/* Profile Picture and Basic Info */}
                            <Grid item xs={12} sm={4}>
                                <Avatar src={profileImage ? URL.createObjectURL(profileImage) : userData.profilePicture} sx={{ width: 100, height: 100, marginBottom: 2 }}>
                                    <AccountCircleIcon sx={{ fontSize: 80 }} />
                                </Avatar>
                                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profileImage')} />
                                <Typography variant="h5">{userData.username}</Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {userData.currentJobTitle}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {userData.email}
                                </Typography>
                                {userData.email === user.primaryEmailAddress.emailAddress && (
                                    <Button variant='contained' onClick={handleSaveChanges}>
                                        Save Changes
                                    </Button>
                                )}
                            </Grid>

                            {/* Detailed Info */}
                            <Grid item xs={12} sm={8}>
                                <Typography variant="h6">About Me</Typography>
                                <TextField variant='outlined' fullWidth multiline rows={3} value={userData.aboutYou} onChange={(e) => setUserData({ ...userData, aboutYou: e.target.value })} />

                                <Typography variant="h6">Skills</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                                    {userData.skills.map((skill, index) => (
                                        <Chip key={index} onDelete={() => handleDeleteSkill(skill)} label={skill} />
                                    ))}
                                </Box>
                                <TextField
                                    label="Add Skill"
                                    variant="standard"
                                    fullWidth
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={handleAddSkill}
                                />

                                <Typography variant="h6">Interests</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                                    {userData.interests.map((interest, index) => (
                                        <Chip key={index} onDelete={() => handleDeleteInterest(interest)} label={interest} icon={<InterestsIcon />} />
                                    ))}
                                </Box>
                                <TextField
                                    label="Add Interests"
                                    variant="standard"
                                    fullWidth
                                    value={interestInput}
                                    onChange={(e) => setInterestInput(e.target.value)}
                                    onKeyPress={handleAddInterest}
                                />

                                <Typography variant="h6">Hobbies</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                                    {userData.hobbies.map((hobby, index) => (
                                        <Chip key={index} onDelete={() => handleDeleteHobby(hobby)} label={hobby} />
                                    ))}
                                </Box>
                                <TextField
                                    label="Add Hobby"
                                    variant="standard"
                                    fullWidth
                                    value={hobbyInput}
                                    onChange={(e) => setHobbyInput(e.target.value)}
                                    onKeyPress={handleAddHobby}
                                />

                                <Typography variant="h6">Languages</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 2 }}>
                                    {userData.language.map((lang, index) => (
                                        <Chip key={index} onDelete={() => handleDeleteLanguage(lang)} label={lang} icon={<LanguageIcon />} />
                                    ))}
                                </Box>
                                <TextField
                                    label="Add Language"
                                    variant="standard"
                                    fullWidth
                                    value={languageInput}
                                    onChange={(e) => setLanguageInput(e.target.value)}
                                    onKeyPress={handleAddLanguage}
                                />

                                <Typography variant="h6">Education</Typography>
                                <Box sx={{ marginBottom: 2 }}>
                                    <Typography variant="body1">
                                        <SchoolIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                                        {userData.highestDegreeEarned} in {userData.fieldOfStudy} from {userData.university} ({userData.graduationYear})
                                    </Typography>
                                    <TextField
                                        label="Degree"
                                        variant="standard"
                                        fullWidth
                                        value={userData.highestDegreeEarned}
                                        onChange={(e) => setUserData({ ...userData, highestDegreeEarned: e.target.value })}
                                    />
                                    <TextField
                                        label="Field of Study"
                                        variant="standard"
                                        fullWidth
                                        value={userData.fieldOfStudy}
                                        onChange={(e) => setUserData({ ...userData, fieldOfStudy: e.target.value })}
                                    />
                                    <TextField
                                        label="University"
                                        variant="standard"
                                        fullWidth
                                        value={userData.university}
                                        onChange={(e) => setUserData({ ...userData, university: e.target.value })}
                                    />
                                    <TextField
                                        label="Graduation Year"
                                        variant="standard"
                                        fullWidth
                                        value={userData.graduationYear}
                                        onChange={(e) => setUserData({ ...userData, graduationYear: e.target.value })}
                                    />
                                </Box>

                                <Typography variant="h6">Resume</Typography>
                                {userData.resume && renderFilePreview(userData.resume)}
                                <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'resume')} />

                                <Typography variant="h6" sx={{ marginTop: 4 }}>Certificates</Typography>
                                {userData.certificates.map((certificate, index) => (
                                    <Box key={index} sx={{ marginTop: 2 }}>
                                        {renderFilePreview(certificate)}
                                    </Box>
                                ))}
                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={(e) => handleFileChange(e, 'certificates')} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )}
        </>
    );
};

export default EditProfile;
