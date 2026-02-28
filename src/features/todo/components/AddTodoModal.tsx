import React, { useState } from 'react';
import {Dialog, DialogTitle,DialogContent, DialogActions, Button, TextField, Box, Typography } from '@mui/material';

interface AddTodoModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (title: string, description?: string, deadline?: string) => void;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({ open, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(false);

    const handleSave = () => {
        if (!title.trim()) {
            setError(true);
            return;
        }
        onAdd(title, description, deadline || undefined);
        resetAndClose();
    };

    const resetAndClose = () => {
        setTitle('');
        setDescription('');
        setDeadline('');
        setError(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={resetAndClose} maxWidth="sm" fullWidth slotProps={{ paper: {sx: { borderRadius: 3 } }}}>
            <DialogTitle sx={{ pb: 1 }}>
                <Typography variant="h6" fontWeight="bold">Add New Task</Typography>
            </DialogTitle>
            <DialogContent dividers sx={{ borderBottom: 'none' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    <TextField autoFocus label="Title" fullWidth variant="outlined" value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError(false);
                        }}
                        error={error}
                        helperText={error ? "Title is required" : ""}
                        required
                    />
                    <TextField label="Description (Optional)" fullWidth variant="outlined" multiline minRows={3} value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField label="Deadline (Optional)" type="datetime-local" fullWidth variant="outlined" value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button onClick={resetAndClose} color="inherit" sx={{ fontWeight: 600 }}>
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ px: 4 }}>
                    Save Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};
