import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {  main: '#0F766E',  },
        secondary: { main: '#FF6B6B', },
        success: { main: '#2E7D32', },
        warning: { main: '#C2410C', },
        error: {  main: '#B91C1C', },
        background: {
            default: '#F4F6F8',
            paper: '#FFFFFF',
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 12,  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' } }},

        MuiButton: {
            styleOverrides: { root: { borderRadius: 8, textTransform: 'none', fontWeight: 600,}}},

        MuiTextField: {
            styleOverrides: { root: { '& .MuiOutlinedInput-root': {borderRadius: 8,}}}}
    },

    typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', button: { textTransform: 'none',} } }
);
