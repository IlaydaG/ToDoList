import React from 'react';
import { Box, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import type { Todo } from '../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newTitle: string, newDescription?: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onUpdate }) => {
    if (todos.length === 0) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, color: 'text.secondary',
                height: '400px',backgroundColor: '#FAFAFA',borderRadius: 3,mt: 3}}>
                <AssignmentIcon sx={{ fontSize: 64, opacity: 0.2, mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                    No Tasks Found
                </Typography>
                <Typography variant="body2">
                    Start by changing criteria or adding a new task.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{ display: 'grid',gap: 3,mt: 3, pb: 6,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </Box>
    );
};
