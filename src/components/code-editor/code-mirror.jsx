import React, { useRef, useEffect } from "react";
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import EditorContext from "./provider";
import { lintKeymap, } from "@codemirror/lint";

export const Editor = ({ onChange }) => {

  const editor = useRef();

  const view = useRef();
  const { darktheme, code } = React.useContext(EditorContext);

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
  }, []);

  useEffect(() => {
    if (view.current && view.current.state.doc.toString() !== code) {
      view.current.dispatch({
        changes: { from: 0, to: view.current.state.doc.length, insert: code }
      });
    }
  }, [code])

  return <div ref={editor}></div>;
}

