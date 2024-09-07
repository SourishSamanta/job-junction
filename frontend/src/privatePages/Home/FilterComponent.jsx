import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  ListItemText,
  Typography,
  Autocomplete,
  IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const FilterComponent = ({ onFilter }) => {
  const initialFilters = {
    employmentType: [],
    experienceLevel: '',
    location: '',
    jobCategory: [],
    salaryRange: '',
  };

  const [filters, setFilters] = useState(initialFilters);

  const employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'];
  const experienceLevels = ['Junior', 'Mid-Level', 'Senior'];
  const locations = ['USA', 'India', 'Remote'];
  const jobCategories = [
    'Software Development',
    'Data Analytics',
    'AI/ML',
    'Cloud Computing',
    'IT/Tech',
  ];
  const salaryRanges = ['< 20k$', '20k$ - 50k$', '> 50k$'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (name) => (e) => {
    const {
      target: { value },
    } = e;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFilter(initialFilters); // Optionally apply the reset filters immediately
  };

  const handleFilter = () => {
    onFilter(filters);
  };

  const clearFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: initialFilters[filterName],
    }));
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Filter Jobs</Typography>

      <FormControl fullWidth>
        <InputLabel>Employment Type</InputLabel>
        <Select
          multiple
          name="employmentType"
          value={filters.employmentType}
          onChange={handleMultiSelectChange('employmentType')}
          renderValue={(selected) => selected.join(', ')}
        >
          {employmentTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={filters.employmentType.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
        {filters.employmentType.length > 0 && (
          <IconButton
            size="small"
            onClick={() => clearFilter('employmentType')}
          >
            <ClearIcon />
          </IconButton>
        )}
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Experience Level</InputLabel>
        <Select
          name="experienceLevel"
          value={filters.experienceLevel}
          onChange={handleChange}
        >
          {experienceLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
        {filters.experienceLevel && (
          <IconButton
            size="small"
            onClick={() => clearFilter('experienceLevel')}
          >
            <ClearIcon />
          </IconButton>
        )}
      </FormControl>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          options={locations}
          getOptionLabel={(option) => option}
          value={filters.location}
          onChange={(event, newValue) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              location: newValue,
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Location" fullWidth />
          )}
        />
        {filters.location && (
          <IconButton
            size="small"
            onClick={() => clearFilter('location')}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      <FormControl fullWidth>
        <InputLabel>Job Category</InputLabel>
        <Select
          multiple
          name="jobCategory"
          value={filters.jobCategory}
          onChange={handleMultiSelectChange('jobCategory')}
          renderValue={(selected) => selected.join(', ')}
        >
          {jobCategories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={filters.jobCategory.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
        {filters.jobCategory.length > 0 && (
          <IconButton
            size="small"
            onClick={() => clearFilter('jobCategory')}
          >
            <ClearIcon />
          </IconButton>
        )}
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Salary Range</InputLabel>
        <Select
          name="salaryRange"
          value={filters.salaryRange}
          onChange={handleChange}
        >
          {salaryRanges.map((range) => (
            <MenuItem key={range} value={range}>
              {range}
            </MenuItem>
          ))}
        </Select>
        {filters.salaryRange && (
          <IconButton
            size="small"
            onClick={() => clearFilter('salaryRange')}
          >
            <ClearIcon />
          </IconButton>
        )}
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleFilter}>
        Apply Filters
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleReset}>
        Reset Filters
      </Button>
    </Box>
  );
};

export default FilterComponent;
