import React, { useState } from 'react'
import EditorContext from "./provider";
import TextEditor from "./text-editor";
// import CodeMirror from './code-mirror';
import CodeMirror from './code-mirror2';
import ErrorBar from './error-bar';
import FormatCode from './format-code';

const CodeEditor = () => {
  const { editor, err } = React.useContext(EditorContext);
  const [js, setJs] = useState("");

  return (
    <>
      {editor && <CodeMirror
        language="javascript"
        displayName="JS"
        value={js}
        setEditorState={setJs} />}
      {!editor && <TextEditor />}
      {err && <ErrorBar />}
      <FormatCode />
    </>
  )
}

export default CodeEditor