import React from 'react'
import EditorContext from "../provider";
import TextEditor from "./text-editor";
import CodeMirror from './code-mirror';
import ErrorBar from './error-bar';
import FormatCode from './format-code';
import { Box } from '@mui/system';


const CodeEditor = () => {

  const { editor, err } = React.useContext(EditorContext);

  return (
    <>
      {/* <Box sx={{ bgcolor: "#2a313e", height: "100%", color: "#ffffff" }}> */}
      {editor && <CodeMirror />}
      {!editor && <TextEditor />}
      {err && <ErrorBar />}
      <FormatCode />
      {/* </Box> */}
    </>
  )
}

export default CodeEditor