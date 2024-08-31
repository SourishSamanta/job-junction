import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchComponent({ searchQuery, setsearchQuery }) {

    const handleSearchChange = (event) => {
        const newValue = event.target.value;
        setsearchQuery(newValue);
        
        if (newValue === '') {
            // This ensures the searchQuery is set to an empty string if the user clears the input
            setsearchQuery('');
        }
    };

    const handleClearSearch = () => {
        setsearchQuery('');
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mb: 2, 
                p: 2,
                width: '100%',
                maxWidth: 600, 
                mx: 'auto'
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search For Job title"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchQuery && (
                               <IconButton onClick={handleClearSearch}>
                               <ClearIcon style={{ color: 'red' }} />
                           </IconButton>
                           
                            )}
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
}

export default SearchComponent;
