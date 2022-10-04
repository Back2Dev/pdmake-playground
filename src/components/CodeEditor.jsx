import React from 'react'
import { Box, ToggleButtonGroup } from '@mui/material';
import TextEditor from './Text';
import { ToggleButton } from '@mui/material';



const CodeEditor = () => {
  return (
    <>
        <Box sx={{ bgcolor: '#2a313e', height: '80vh', color:'#ffffff' }} >
            <TextEditor />
        </Box>
    </>
  )
}

export default CodeEditor