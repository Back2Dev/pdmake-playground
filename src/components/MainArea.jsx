import React from 'react'
import CodeEditor from './CodeEditor'
import PdfViewer from './PdfViewer'
import {Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextEditor from './Text';


const MainArea = () => {
  return (
    <div className="main-area">
        <Grid container columns={2} >
            <Grid item columns={1}>
                <CodeEditor />
            </Grid>
            <Grid item columns={1}>
                <PdfViewer />
            </Grid> 
        </Grid>
    </div>
  )
}

export default MainArea