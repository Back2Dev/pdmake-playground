import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { historyField } from '@codemirror/commands';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const stateFields = { history: historyField };

// chlick the button to fomat to PDF
const clickFormatButton = () => {
  const value = localStorage.getItem('myValue') || '';
  const docDefinition = 'docDefinition={'+value+'}';
  document.getElementById("pdfView").innerHTML = docDefinition;  
}

const Mainbody = () => {
  const serializedState = localStorage.getItem('myEditorState');
  const value = localStorage.getItem('myValue') || '';
  const docDefinition = 'docDefinition={'+value+'}';


  return (
    <>
      <Grid container spacing={0} sx ={{width:'100vw', marginTop:"12vh"}}>
        <Grid item sm={12} md={6}>
          <Box sx={{ maxHeight:"90vh", minHeight: '90vh'}}>
            <CodeMirror
              height='90vh'
              value={value}
                initialState={
                serializedState
                  ? {
                      json: JSON.parse(serializedState || ''),
                      fields: stateFields,
                    }
                  : undefined
              }
              onChange={(value, viewUpdate) => {
                localStorage.setItem('myValue', value);

                const state = viewUpdate.state.toJSON(stateFields);
                localStorage.setItem('myEditorState', JSON.stringify(state))
              }}
              extensions={[javascript({ jsx: true })]}
              theme={okaidia}
            />    
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box id="pdfView" sx={{ maxHeight:"90vh", minHeight: '90vh', padding:'10px'}}>
            {docDefinition}
          </Box>
        </Grid>  
      </Grid>
      <Button onClick={clickFormatButton}>
        Format
      </Button>
    </>
  )
}



export default Mainbody
