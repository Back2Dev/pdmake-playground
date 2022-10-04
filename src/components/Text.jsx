import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import React,{ useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { basicSetup, minimalSetup } from '@uiw/codemirror-extensions-basic-setup';



function TextEditor() {

  const [text, setText] = useState("console.log('hello world!')");
  const extentions = [javascript({jsx:true})];
  const [theme,setTheme] = useState(xcodeDark);
  const [width, setWidth] = useState("auto");

  const selectTheme = (event) =>{
    if (event.target.value === 'dark'){
      setTheme(xcodeDark);
    }
    else if (event.target.value === 'light'){
      setTheme(xcodeLight);
    }
}
  return (
  <>
    <CodeMirror
      value={text}
      extensions={extentions}
      height='80vh'
      width={width}
      color='#2A313E'
      placeholder="please add JavaScript code..."
      basicSetup={{
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: false,
        lintKeymap:true,
      }}
      onChange={(v) => setText(v)}
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
