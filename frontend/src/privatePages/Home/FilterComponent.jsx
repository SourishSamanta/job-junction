import React, { useState } from 'react';
import {
  TextField, Button, FormControl, InputLabel, Select, MenuItem,
  Box, Typography
} from '@mui/material';

function FilterComponent({ filters, setFilters, handleFilter }) {
  

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  

  const resetFilters = () => {
    setFilters({
      jobTitle: '',
      location: '',
      employmentType: '',
      experienceLevel: '',
      jobCategory: '',
      companyName: '',
      jobStatus: '',
      skills: '',
      preferredQualifications: '',
      salaryRange: '',
      datePosted: '',
    });
    onFilter({});
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter Jobs
      </Typography>

      {/* Location */}
      <TextField
        fullWidth
        label="Location"
        variant="outlined"
        name="location"
        value={filters.location}
        onChange={handleChange}
        margin="normal"
      />

      {/* Employment Type */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Employment Type</InputLabel>
        <Select
          name="employmentType"
          value={filters.employmentType}
          onChange={handleChange}
          label="Employment Type"
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
      </FormControl>

      {/* Experience Level */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Experience Level</InputLabel>
        <Select
          name="experienceLevel"
          value={filters.experienceLevel}
          onChange={handleChange}
          label="Experience Level"
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          <MenuItem value="Entry-Level">Entry-Level</MenuItem>
          <MenuItem value="Mid-Level">Mid-Level</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
        </Select>
      </FormControl>

      {/* Job Category */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Job Category</InputLabel>
        <Select
          name="jobCategory"
          value={filters.jobCategory}
          onChange={handleChange}
          label="Job Category"
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          <MenuItem value="Software development">Software development</MenuItem>
          <MenuItem value="Data Analytics">Data Analytics</MenuItem>
          <MenuItem value="AI/ML">AI/ML</MenuItem>
          <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
          <MenuItem value="IT/Tech">IT/Tech</MenuItem>
        </Select>
      </FormControl>

      {/* Job Status */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Job Status</InputLabel>
        <Select
          name="jobStatus"
          value={filters.jobStatus}
          onChange={handleChange}
          label="Job Status"
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {/* Salary Range */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Salary Range</InputLabel>
        <Select
          name="salaryRange"
          value={filters.salaryRange}
          onChange={handleChange}
          label="Salary Range"
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          <MenuItem value="Below 20k">Below 20k</MenuItem>
          <MenuItem value="20k - 40k">20k - 40k</MenuItem>
          <MenuItem value="40k - 60k">40k - 60k</MenuItem>
          <MenuItem value="60k - 80k">60k - 80k</MenuItem>
          <MenuItem value="Above 80k">Above 80k</MenuItem>
        </Select>
      </FormControl>

      {/* Date Posted */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Date Posted</InputLabel>
        <Select
          name="datePosted"
          value={filters.datePosted}
          onChange={handleChange}
          label="Date Posted"
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          <MenuItem value="Last 24 hours">Last 24 hours</MenuItem>
          <MenuItem value="Last 7 days">Last 7 days</MenuItem>
          <MenuItem value="Last 30 days">Last 30 days</MenuItem>
        </Select>
      </FormControl>

      {/* Apply and Reset Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
}

export default FilterComponent;
