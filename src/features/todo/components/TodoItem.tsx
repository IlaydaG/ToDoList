import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, IconButton, Checkbox, Box, Chip, TextField, Menu, MenuItem, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import type { Todo } from '../types/todo.types';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newTitle: string, newDescription?: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        if (isEditing && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditing]);

    const handleMenuClose = () => setAnchorEl(null);

    const handleEditStart = () => {
        setIsEditing(true);
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        handleMenuClose();
    };

    const handleDelete = () => {
        onDelete(todo.id);
        handleMenuClose();
    };

    const handleEditSave = () => {
        if (editTitle.trim() && (editTitle !== todo.title || editDescription !== (todo.description || ''))) {
            onUpdate(todo.id, editTitle, editDescription);
        } else {
            setEditTitle(todo.title);
            setEditDescription(todo.description || '');
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditTitle(todo.title);
        setEditDescription(todo.description || '');
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    const getDeadlineChipInfo = () => {
    if (!todo.deadline || todo.completed) return null;

    const deadlineDate = new Date(todo.deadline);
    const diffMs = deadlineDate.getTime() - new Date().getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const dateTimeStr = new Intl.DateTimeFormat('tr-TR', {day: '2-digit',month: 'short',year: 'numeric',hour: '2-digit',minute: '2-digit'}).format(deadlineDate);

    if (diffMs < 0) {
        return { label: `Süresi Geçti: ${dateTimeStr}`, color: 'error' as const };
    } else if (diffHours <= 24) {
        return { label: `Yaklaşıyor: ${dateTimeStr}`, color: 'warning' as const };
    }

    return { label: dateTimeStr, color: 'default' as const };
};

    const chipInfo = getDeadlineChipInfo();


    return (
        <Card sx={{
            height: '240px', display: 'flex', flexDirection: 'column',
            backgroundColor: todo.color || '#E8DAEF',
            opacity: todo.completed ? 0.6 : 1,
            transition: 'all 0.2s', boxShadow: 'none', position: 'relative',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }
        }}>
            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%', pb: '16px !important' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>   {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', overflow: 'hidden', flexGrow: 1 }}>
                        <Checkbox  sx={{ color: 'rgba(0,0,0,0.2)', p: 0, mr: 1, mt: 0.3, '&.Mui-checked': { color: 'rgba(0,0,0,0.5)' } }} 
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            size="small" />
                        {isEditing ? (
                            <TextField
                                inputRef={titleInputRef}
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                variant="standard" fullWidth size="small" placeholder="Title"
                                sx={{ mb: 1, '& .MuiInput-underline:before': { borderBottom: '1px solid rgba(0,0,0,0.3)' },
                                    '& .MuiInput-underline:after': { borderBottom: '2px solid rgba(0,0,0,0.8)' },
                                    '& input': { fontWeight: 600, color: 'text.primary', pb: 0 }
                                }} />
                        ) : (
                            <Typography variant="subtitle1" title={todo.title} sx={{ fontWeight: 600,
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? 'rgba(0,0,0,0.4)' : 'text.primary',
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'
                            }}>
                                {todo.title}
                            </Typography>
                        )}
                    </Box>

                    {!isEditing && (
                        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ color: 'rgba(0,0,0,0.5)', p: 0, ml: 1, flexShrink: 0 }}>
                            <MoreHorizIcon />
                        </IconButton>
                    )}

                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        PaperProps={{ elevation: 3, sx: { borderRadius: 2, minWidth: 120 } }}>
                        <MenuItem onClick={handleEditStart} sx={{ fontSize: '0.875rem' }}>
                            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete} sx={{ fontSize: '0.875rem', color: 'error.main' }}>
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
                        </MenuItem>
                    </Menu>
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Description */}
                    {isEditing ? (
                        <TextField value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            onKeyDown={handleKeyDown}
                            variant="standard" fullWidth multiline minRows={3} maxRows={3} placeholder="Description"
                            sx={{
                                '& .MuiInput-underline:before': { borderBottom: '1px solid rgba(0,0,0,0.1)' },
                                '& .MuiInput-root': { fontSize: '0.85rem', color: 'rgba(0,0,0,0.8)' }
                            }} />
                    ) : (
                        todo.description && (
                            <Typography variant="body2" title={todo.description} sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.85rem',
                                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                                overflow: 'hidden', textOverflow: 'ellipsis', wordBreak: 'break-word', lineHeight: 1.5
                            }}>
                                {todo.description}
                            </Typography>
                        )
                    )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, flexShrink: 0 }}> {/* Footer: Deadline chip + Edit actions */}
                    <Box>
                        {chipInfo && (
                            <Chip icon={<EventIcon style={{ fontSize: 14 }} />} label={chipInfo.label}size="small"
                                color={chipInfo.color !== 'default' ? chipInfo.color : undefined}
                                sx={{fontSize: '0.75rem', fontWeight: 500, height: 24, backgroundColor: chipInfo.color === 'default' ? 'rgba(0,0,0,0.06)' : undefined,
                                    color: chipInfo.color === 'default' ? 'rgba(0,0,0,0.7)' : undefined,
                                    '& .MuiChip-icon': { color: chipInfo.color === 'default' ? 'rgba(0,0,0,0.5)' : 'inherit', ml: 1 }
                                }} /> )}
                    </Box>

                    {isEditing && (
                        <Box>
                            <Button size="small" color="inherit" onClick={handleCancelEdit}
                                sx={{ minWidth: 0, p: '4px 8px', fontSize: '0.75rem', mr: 1, color: 'rgba(0,0,0,0.6)' }}>
                                Cancel
                            </Button>
                            <Button size="small" variant="contained" color="primary" onClick={handleEditSave}
                                sx={{ minWidth: 0, p: '4px 12px', fontSize: '0.75rem' }}>
                                Save
                            </Button>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};