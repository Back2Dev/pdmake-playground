import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Box, ToggleButtonGroup, ToggleButton, Button, Grid } from '@mui/material';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import Split from 'react-split'
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { styled } from '@mui/material/styles';

const CodeEditor = () => {
  
  const extentions = [javascript({ jsx: true })];
  const [theme, setTheme] = useState(xcodeDark);
  const [width, setWidth] = useState("auto");
  const [text, setText] = useState("var dd = {content: ['Hello world', 'Hello World!']}")
  const selectTheme = (event) => {
    if (event.target.value === 'dark') {
      setTheme(xcodeDark);
    }
    else if (event.target.value === 'light') {
      setTheme(xcodeLight);
    }
  }
  const convertDoc = (value) => {
    try {
      const newDoc = value.split('=')[1].trim();
      const keyFinderRegEX = /([{,]\s*)(\S+)\s*(:)/mg;
      const convertedJSONString = newDoc.replace(keyFinderRegEX, '$1"$2"$3').replaceAll("'", "\"");
      const parsedObj = JSON.parse(convertedJSONString);
      localStorage.setItem('myValue', JSON.stringify(parsedObj))
      return parsedObj;
    } catch (e) { 
      console.log('parsing error: ', e);
    }
  }

  const [doc, setDoc] = useState(convertDoc(text));

  
  const pdfConverter = (doc) => {
    try {
      const pdfDocGenerator = pdfMake.createPdf(doc);
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const iframe = document.querySelector('#pdf-viewer');
        iframe.src = dataUrl;
      });
    } catch (e) { 
      console.log('pdf generation error: ', e);
    }
  }

  const [pdfData, setPdfData] = useState(pdfConverter(doc))
 
  const onInputChange = (value) => {
    setText(value);
    setDoc(convertDoc(value));
    const liveUpdate = (err, doc) => {
      if (err) {
        console.log('live update error: ',err)
      } else {
        setPdfData(pdfConverter(doc));
      }
    }
  }

  const handleUpdateClick = (e) => {
    e.preventDefault();  
  }
  
  return (
    <Grid container columns={12} className="main-area">
       <Box width="100vw" >
         <Split className="split">
          <Grid item columns={1}>
            <Box sx={{ bgcolor: '#2a313e', height: '100%', color: '#ffffff' }} >
              <CodeMirror
                value={text}
                extensions={extentions}
                max-height='80vh'
                width={width}
                color='#2A313E'
                placeholder="please add JavaScript code..."
                basicSetup={{
                  dropCursor: false,
                  allowMultipleSelections: false,
                  indentOnInput: false,
                  lintKeymap: true,
                }}
                onChange={onInputChange}
                theme={theme}
              />
            </Box > 
            <ToggleButtonGroup exclusive={true} className='MuiToggleButtonGroup-groupedHorizontal theme-selector'>
              <ToggleButton value="dark" onClick={selectTheme} aria-label="Dark-theme">Dark</ToggleButton>
              <ToggleButton value="light" onClick={selectTheme} aria-label="Light-theme">Light</ToggleButton>
            </ToggleButtonGroup> 
          </Grid>
          <Grid item columns={1}>
            <Box sx={{ bgcolor: '#cccccc', height: '80vh', color: '#FFFFFF' }} id="iframeContainer">
              <iframe id="pdf-viewer" />
            </Box >
            <Button onClick={handleUpdateClick}>Update PDF</Button>
          </Grid>
         </Split>
       </Box>
     </Grid>
  )
}

export default CodeEditor