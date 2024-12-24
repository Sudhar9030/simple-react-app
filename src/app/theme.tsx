'use client'
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  cssVariables: true
});

export default darkTheme;