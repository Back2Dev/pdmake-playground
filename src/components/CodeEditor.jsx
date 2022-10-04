import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CodeEditor = () => {
  
  const extentions = [javascript({ jsx: true })];
  const [theme, setTheme] = useState(xcodeDark);
  const [width, setWidth] = useState("auto");
  const [text, setText] = useState("var dd = {content: ['Hello world']}")
  const selectTheme = (event) => {
    if (event.target.value === 'dark') {
      setTheme(xcodeDark);
    }
    else if (event.target.value === 'light') {
      setTheme(xcodeLight);
    }
  }
  const convertDoc = (value) => {
    const newDoc = value.split('=')[1].trim();
    const keyFinderRegEX = /([{,]\s*)(\S+)\s*(:)/mg;
    const convertedJSONString = newDoc.replace(keyFinderRegEX, '$1"$2"$3').replaceAll("'", "\"");
    const parsedObj = JSON.parse(convertedJSONString);
    return parsedObj;
  }
  const [doc, setDoc] = useState(convertDoc(text));
  
  const pdfConverter = (doc) => {
    const pdfDocGenerator = pdfMake.createPdf(doc);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const iframe = document.querySelector('#pdf-viewer');
      iframe.src = dataUrl;
    });
  }
  const [pdfData, setPdfData] = useState(pdfConverter(doc))
 
  const onInputChange = (value) => {
    setText(value);
    setDoc(convertDoc(value));
    setPdfData(pdfConverter(doc));
  }
  return (
    <>
        <Box sx={{ bgcolor: '#2a313e', height: '80vh', color:'#ffffff' }} >
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
      </Box>
      <ToggleButtonGroup exclusive={true} className='MuiToggleButtonGroup-groupedHorizontal theme-selector'>
        <ToggleButton value="dark" onClick={selectTheme} aria-label="Dark-theme">Dark</ToggleButton>
        <ToggleButton value="light" onClick={selectTheme} aria-label="Light-theme">Light</ToggleButton>
      </ToggleButtonGroup>
      
    </>
  )
}

export default CodeEditor