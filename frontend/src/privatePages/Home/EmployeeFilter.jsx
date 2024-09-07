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
  IconButton,
  Grid,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const EmployeeFilter = ({ onFilter }) => {
  const initialFilters = {
    jobCategories: [],
    locationPreferences: [],
    employmentTypes: '',
  };

  const [filters, setFilters] = useState(initialFilters);

  // Example options based on the user data provided
  const jobCategories = [
    "Software Development",
    "Machine Learning",
    "qwertyu"
  ];
  
  const locationPreferences = [
    "Remote",
    "On-Site"
  ];

  const employmentTypes = [
    "Full-Time",
    "Part-Time",
    "Contract",
    "Internship"
  ];

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filter Employees
      </Typography>

      <Grid container spacing={2} alignItems="center">
        {/* Job Categories Multi-Select */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Job Categories</InputLabel>
            <Select
              multiple
              name="jobCategories"
              value={filters.jobCategories}
              onChange={handleMultiSelectChange('jobCategories')}
              renderValue={(selected) => selected.join(', ')}
            >
              {jobCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={filters.jobCategories.indexOf(category) > -1} />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
            {filters.jobCategories.length > 0 && (
              <IconButton size="small" onClick={() => clearFilter('jobCategories')}>
                <ClearIcon />
              </IconButton>
            )}
          </FormControl>
        </Grid>

        {/* Location Preferences Multi-Select */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Location Preferences</InputLabel>
            <Select
              multiple
              name="locationPreferences"
              value={filters.locationPreferences}
              onChange={handleMultiSelectChange('locationPreferences')}
              renderValue={(selected) => selected.join(', ')}
            >
              {locationPreferences.map((location) => (
                <MenuItem key={location} value={location}>
                  <Checkbox checked={filters.locationPreferences.indexOf(location) > -1} />
                  <ListItemText primary={location} />
                </MenuItem>
              ))}
            </Select>
            {filters.locationPreferences.length > 0 && (
              <IconButton size="small" onClick={() => clearFilter('locationPreferences')}>
                <ClearIcon />
              </IconButton>
            )}
          </FormControl>
        </Grid>

        {/* Employment Type Select */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select
              name="employmentTypes"
              value={filters.employmentTypes}
              onChange={handleChange}
            >
              {employmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {filters.employmentTypes && (
              <IconButton size="small" onClick={() => clearFilter('employmentTypes')}>
                <ClearIcon />
              </IconButton>
            )}
          </FormControl>
        </Grid>
      </Grid>

      {/* Apply and Reset Buttons */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Apply Filters
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeFilter;
