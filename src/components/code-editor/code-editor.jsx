import React, { useState } from "react"
import { Box, ToggleButtonGroup, ToggleButton, Button, Grid } from '@mui/material';
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import Split from 'react-split';
import { debounce } from "lodash";

import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { historyField } from "@codemirror/commands"
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

import './code-editor.css'
import ErrorBar from "../error-bar/error-bar";


const stateFields = { history: historyField }

const CodeEditor = () => {
  const serializedState = localStorage.getItem("myEditorState")
  // const [value,setValue] = useState(localStorage.getItem("myValue") || "")
  const [err, setErr] = useState("")
  const [theme, setTheme] = useState(xcodeDark);
  const value = localStorage.getItem("myValue") || ""

  const selectTheme = (event) => {
    if (event.target.value === 'dark') {
      setTheme(xcodeDark);
    }
    else if (event.target.value === 'light') {
      setTheme(xcodeLight);
    }
  }
  let dd = {}
  const formatData = () => {
    try {
      const value = localStorage.getItem("myValue") || ""
      console.log("value: ", value)
      const docDefinition = eval(value)
      console.log("docDefinition: ", docDefinition)
      const pdfDocGenerator = pdfMake.createPdf(docDefinition)
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.getElementById("pdfView")
        targetElement.src = dataUrl
      })
    } catch (e) {
      console.log("error message: ", e)
      setErr(`Error: ${e.message}`)
      setTimeout(() => {
        setErr("")
      }, 3000)
    }
  }

  const handleChange = (value, viewUpdate) => {
    localStorage.setItem("myValue", value.replace("var dd", 'dd'))
    const state = viewUpdate.state.toJSON(stateFields)
    localStorage.setItem("myEditorState", JSON.stringify(state))
    formatData()
  }

  const debouncedOnChange = debounce(handleChange,1000)


  const clickFormatButton = () => { 
    formatData()
  }


  return (
    <>
      <Grid container columns={12} className="main-area">
        <Box width="100vw" >
          <Split className="split">
            <Grid item columns={1}>
              <Box sx={{ bgcolor: '#2a313e', height: '10vh', color: '#ffffff' }} >
                <CodeMirror
                  value={value}
                  height="80vh"
                  initialState={
                    serializedState
                      ? {
                        json: JSON.parse(serializedState || ""),
                        fields: stateFields,
                      }
                      : undefined
                  }
                  onChange = {debouncedOnChange}
                  extensions={[javascript({ jsx: true })]}
                  basicSetup={{
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: false,
                    lintKeymap: true,
                  }}
                  theme={theme}
                />
                <ErrorBar errorMessage={err} />
              </Box >
            </Grid>
            <Grid item columns={1}>
              <Box sx={{ bgcolor: '#cccccc', height: '80vh', color: '#FFFFFF' }} id="iframeContainer">
                <iframe
                  id="pdfView"
                  src=""
                  width="100%"
                  height="100%"
                  border="0"
                ></iframe>
              </Box >
              <div>
                <Button onClick={clickFormatButton}>Update PDF</Button>
                <ToggleButtonGroup exclusive={true} className='MuiToggleButtonGroup-groupedHorizontal theme-selector'>
                  <ToggleButton value="dark" onClick={selectTheme} aria-label="Dark-theme">Dark</ToggleButton>
                  <ToggleButton value="light" onClick={selectTheme} aria-label="Light-theme">Light</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Grid>
          </Split>
        </Box>
      </Grid>
    </>
  )
}

export default CodeEditor
