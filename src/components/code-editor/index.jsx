import React, { useRef, useEffect } from 'react'
import EditorContext from "./provider";
import Split from "react-split";
import { Box, Grid, FormGroup, Button } from "@mui/material";
// codeeditor dependencies
import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDarkTheme } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';
import { lintKeymap, } from "@codemirror/lint";
// pdfmake dependencies
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Playground = () => {
  const { cmeditor, err, setErr, code, setCode, darktheme } = React.useContext(EditorContext);
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
  }, [darktheme, cmeditor]);

  useEffect(() => {
    if (view.current && view.current.state.doc.toString() !== code) {
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
    setCode(formatted);
  };

  let dd = {};
  const makePdf = () => {
    try {
      const docDefinition = eval(code);
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.getElementById("pdfView");
        targetElement.src = dataUrl;
        setErr("");
      });
    } catch (e) {
      console.log("error message: ", e);
      setErr(`Error: ${e.message}`);
    }
  };

  useEffect(() => {
    makePdf();
  }, [code]);
  return (
    <>
      <Grid container className="main-area">
        <Box width="100vw">
          <Split className="split">
            <Grid item>
              <Box sx={{ bgcolor: "#2a313e", height: "100%", color: "#ffffff" }}>
                {cmeditor && (
                  <div ref={editor} onChange={(e) => setCode(e.target.value)}></div>
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
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{ bgcolor: "#cccccc", height: "100%", color: "#FFFFFF" }}
                id="iframeContainer"
              >
                <iframe id="pdfView" src="" data-cy="pdfmake"></iframe>
              </Box>
            </Grid>
          </Split>
        </Box>
      </Grid>
    </>
  );
};

export default Playground;
