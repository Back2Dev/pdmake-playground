import React, { useRef, useCallback, useState } from 'react'
import { JSHINT } from 'jshint'

import { Controlled as CodeMirrorComp } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import "codemirror/mode/jsx/jsx"
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/javascript-lint.js'
import 'codemirror/addon/hint/javascript-hint.js'
window.JSHINT = JSHINT

import EditorContext from "./provider";


const codemirrorOptions = {
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99,
  theme: 'material',
  lint: true,
  keymap: "default",
  gutters: ['CodeMirror-lint-markers'],
}

const CodeMirror = ({ setEditorState }) => {
  const { darktheme, code, setCode } = React.useContext(EditorContext);
  const cmRef = useRef(null);
  const [input, setInput] = useState('');
  // const [value, setValue] = useState("var dd = {content:'hello'};");

  const [timeoutId, setTimeoutId] = React.useState(null)
  const handleKeyPress = (editor, event, input) => {
    // if (event.keyCode === KEY_CODES.ENTER) {
    //   // empty here
    console.log('input: ', input);
    // }
  };

  const debounce = (callback, wait = 1000) => {
    return (...args) => {
      window.clearTimeout(timeoutId)
      setTimeoutId(
        window.setTimeout(() => {
          callback.apply(null, args)
        }, wait)
      )
    }
  }

  const handleEditorInput = React.useCallback(
    debounce((val) => {
      if (dirty) {
        setCode(val)
        setDirty(false)
      }
    })
  )
  const handleChange = (editor, data, value) => {
    setEditorState(value);
    console.log(value)
  }
  return (
    <>
      <CodeMirrorComp
        value={code}
        ref={cmRef}
        options={codemirrorOptions}
        // onBeforeChange={handleChange}

        onBeforeChange={(editor, data, val) => {

          console.log({ val, data, editor })
          setCode(val)
        }}
        onChange={(editor, data, val) => { }}
      // onKeyUp={(editor, event) => handleKeyPress(editor, event)}
      />
    </>
  )
}

export default CodeMirror




