import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log('Search term:', searchTerm);
    };

    const handleSearch = () => {
        console.log('Search term:', searchTerm);
        // Add your search logic here
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
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch} edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default SearchComponent;
