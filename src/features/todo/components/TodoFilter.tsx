import React from 'react';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import type { TodoFilterType } from '../types/todo.types';

interface TodoFilterProps {
    filter: TodoFilterType;
    onFilterChange: (filter: TodoFilterType) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
    const handleChange = (_: React.MouseEvent<HTMLElement>,
        newFilter: TodoFilterType | null,
          ) => {
        if (newFilter !== null) {
            onFilterChange(newFilter);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ToggleButtonGroup color="primary" value={filter} exclusive onChange={handleChange} aria-label="Task Filters" size="small" >
                <ToggleButton value="All" aria-label="All" sx={{ px: 3 }}>All</ToggleButton>
                <ToggleButton value="Active" aria-label="Active" sx={{ px: 3 }}> Active</ToggleButton>
                <ToggleButton value="Completed" aria-label="Completed" sx={{ px: 3 }}>  Completed</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};
