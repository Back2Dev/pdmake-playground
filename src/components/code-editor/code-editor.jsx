import React, { useRef, useEffect } from 'react'
import EditorContext from "./provider";
import { FormGroup, Button } from "@mui/material";
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";

import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import { lintKeymap, } from "@codemirror/lint";

const CodeEditor = () => {
  const { cmeditor, err, code, setCode, darktheme } = React.useContext(EditorContext);

  const editor = useRef();
  const view = useRef();
  const taRef = useRef(null);

  const errStyle = {
    color: "red",
    backgroundColor: "blanchedalmond",
    paddingLeft: "2vw",
    height: "fit-content",
  };

  let myTheme = EditorView.theme({
    "&": {
      color: "#034",
      backgroundColor: "white"
    },
    ".cm-content": {
      caretColor: "#0e9"
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9"
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074"
    },
    ".cm-gutters": {
      backgroundColor: "#045",
      color: "#ddd",
      border: "none"
    }
  }, { dark: true })

  const onChange = (e) => setCode(e.target.value)

  const onUpdate = EditorView.updateListener.of(({ state }) => {
    onChange({ target: { value: state.doc.toString() } });
  })

  const theme = darktheme ? oneDarkTheme : myTheme;

  useEffect(() => {
    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab, lintKeymap]),
        onUpdate,
        javascript(),
        theme,
      ],
    });

    view.current = new EditorView({ state: startState, parent: editor.current });

    return () => {
      view.current.destroy();
    };
  }, [darktheme]);

  useEffect(() => {
    if (view.current && view.current.state.doc.toString() !== code) {
      console.log("updated data")
      view.current.dispatch({
        changes: { from: 0, to: view.current.state.doc.length, insert: code }
      });
    }

  }, [code])

  const formatCode = () => {
    const formatted = prettier.format(code, {
      useTabs: false,
      printWidth: 90,
      tabWidth: 2,
      singleQuote: true,
      semi: false,
      parser: "babel",
      plugins: [babelParser],
    });
    console.log("formatted:", formatted);
    setCode(formatted);
  };

  return (
    <>
      {cmeditor && (
        <div ref={editor} onChange={onChange}></div>
      )}
      {!cmeditor && (
        <textarea
          className="cm-editor"
          ref={taRef}
          id="textarea"
          name="textarea"
          data-cy="typeinarea"
          style={{ width: "100%" }}
        >
          {code}
        </textarea>
      )}
      {err && (
        <div
          data-cy="error-bar"
          style={
            err
              ? errStyle
              : {
                display: "none",
              }
          }
        >
          {err}
        </div>)
      }
      <FormGroup>
        <Button
          onClick={formatCode}
          data-cy="format"
          variant="outlined"
          style={{ margin: "0px", padding: "0px", height: "20px" }}
        >
          Format
        </Button>
      </FormGroup>
    </>
  )
}

export default CodeEditor