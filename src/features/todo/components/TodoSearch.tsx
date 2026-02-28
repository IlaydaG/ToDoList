import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TodoSearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({ searchQuery, onSearchChange }) => {
    return (
        <Box
            sx={{  display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF',  borderRadius: '8px', border: '1px solid #EAEAEA', padding: '4px 12px', width: '100%', maxWidth: '400px' }}  >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <InputBase placeholder="Search List" value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{  flex: 1, fontSize: '0.9rem', color: 'text.primary'}} />
        </Box>
    );
};
