import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import React,{ useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';
import pdfMake from "pdfmake";
// // import pdfFonts from "pdfmake/build/vfs_fonts";
// // pdfMake.vfs = pdfFonts.pdfMake.vfs;




function TextEditor() {

  const [text, setText] = useState(localStorage.getItem('myValue') || '');
  const extentions = [javascript({jsx:true})];
  const [theme,setTheme] = useState(xcodeDark);
  const [width, setWidth] = useState("auto");
  
  const [doc,setDoc] = useState(text)
  const selectTheme = (event) =>{
    if (event.target.value === 'dark'){
      setTheme(xcodeDark);
    }
    else if (event.target.value === 'light'){
      setTheme(xcodeLight);
    }
  }
  
  const onInputChange = (value) => {
    setText(value);
    setDoc(value)
    const pdfDocGenerator = pdfMake.createPdf(doc);
  }
  return (
  <>
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
        lintKeymap:true,
      }}
      onChange={onInputChange}
      theme={theme}
    />
      <ToggleButtonGroup exclusive={true} className='MuiToggleButtonGroup-groupedHorizontal theme-selector'>
        <ToggleButton value="dark" onClick={selectTheme} aria-label="Dark-theme">Dark</ToggleButton>
        <ToggleButton value="light" onClick={selectTheme} aria-label="Light-theme">Light</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}


export default TextEditor;
