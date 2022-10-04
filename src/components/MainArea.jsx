import React from 'react'
import CodeEditor from './CodeEditor'
import PdfViewer from './PdfViewer'
import {Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextEditor from './Text';
import Split from 'react-split'



const MainArea = () => {
  return (
    
    <Grid container columns={2} className="main-area">
      <Box width="100vw" >
      <Split className="split">
          <Grid item columns={1}>
            <CodeEditor />
          </Grid>
          <Grid item columns={1}>
            <PdfViewer />
          </Grid>
        </Split>
      </Box>
    </Grid>
  )
}

export default MainArea