import React, { useRef, useEffect } from "react";
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { autoCloseTags, javascript } from '@codemirror/lang-javascript';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import EditorContext from "./provider";
import { lintKeymap, } from "@codemirror/lint";

export const Editor = () => {

  const editor = useRef();
  const { darktheme, code, setCode, setDirty, dirty } = React.useContext(EditorContext);
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

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
    setDirty(true);
  });

  const theme = darktheme ? oneDarkTheme : myTheme;

  useEffect(() => {
    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab, lintKeymap]),
        onUpdate,
        javascript(),
        autoCloseTags,
        theme,
      ],
    });

    const view = new EditorView({ state: startState, parent: editor.current });

    return () => {
      view.destroy();
    };
  }, [dirty, theme]);

  return <div ref={editor}></div>;
}

