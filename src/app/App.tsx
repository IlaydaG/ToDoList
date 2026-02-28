import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { theme } from '../theme/theme';
import { useTodos } from '../features/todo/hooks/useTodos';
import { TodoList } from '../features/todo/components/TodoList';
import { TodoFilter } from '../features/todo/components/TodoFilter';
import { TodoSearch } from '../features/todo/components/TodoSearch';
import { AddTodoModal } from '../features/todo/components/AddTodoModal';

const App: React.FC = () => {
    const { todos, filter, setFilter, searchQuery, setSearchQuery, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
    };

    const today = new Intl.DateTimeFormat('en-US', {
        day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default',pt: { xs: 2, md: 4 },px: { xs: 2, md: 4 },}}>
                <Container maxWidth="lg" disableGutters>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <Typography variant="h5" fontWeight="bold">Todo List</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 4, gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" fontWeight="bold">
                                {today} 
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'flex-end', width: { xs: '100%', sm: 'auto' } }}>
                            <TodoSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddClick}
                                sx={{ textTransform: 'none', fontWeight: 600, whiteSpace: 'nowrap', borderRadius: 2, bgcolor: '#306df0',
                                     '&:hover': {bgcolor: '#1D4ED8'}
                                }}>
                                Add New Plan
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <TodoFilter filter={filter} onFilterChange={setFilter} />
                    </Box>
                    <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
                </Container>
            </Box>

            <AddTodoModal
                open={isAddModalOpen}
                onClose={handleCloseModal}
                onAdd={addTodo}
            />

        </ThemeProvider>
    );
};

export default App;
