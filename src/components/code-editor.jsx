import React, { useState, useRef, useEffect } from "react";
import Split from "react-split";
import { debounce } from "lodash";

import {
  Box,
  Button,
  Grid,
  TextField,
  FormGroup
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { javascript } from "@codemirror/lang-javascript";

import prettier from "prettier/standalone";
import babelParser from "prettier/parser-babel";

import EditorContext from "./provider";
import ErrorBar from "./error-bar";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CodeEditor = (props) => {
  const { code, setCode } = React.useContext(EditorContext);
  const { editor, setEditor } = React.useContext(EditorContext);
  const { darktheme, setDarkTheme } = React.useContext(EditorContext);
  const [err, setErr] = useState("");
  const taRef = useRef(null);
  const cmRef = useRef(null);

  let dd = {};

  const theme = (darktheme) ? xcodeDark : xcodeLight;

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
  }, []);

  const handleChange = (val, viewUpdate) => {
    setCode(val);
    makePdf();
  };

  const debouncedOnChange = debounce(handleChange, 1000);

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

  return (
    <>
      <Grid container columns={12} className="main-area">
        <Box width="100vw">
          <Split className="split">
            <Grid item columns={1}>
              <Box
                sx={{ bgcolor: "#2a313e", height: "10vh", color: "#ffffff" }}
              >
                {editor && (
                  <CodeMirror
                    value={`${code}`}
                    ref={cmRef}
                    height="80vh"
                    onChange={debouncedOnChange}
                    extensions={[javascript({ jsx: true })]}
                    basicSetup={{
                      dropCursor: false,
                      allowMultipleSelections: false,
                      indentOnInput: false,
                      lintKeymap: true,
                    }}
                    theme={theme}
                  />
                )}
                <ErrorBar errorMessage={err} data-cy="errorbar" />
                {!editor && (
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
                <FormGroup>
                  <Button
                    onClick={formatCode}
                    data-cy="format"
                    variant="outlined"
                  >
                    Format
                  </Button>
                </FormGroup>
              </Box>
            </Grid>
            <Grid item columns={1}>
              <Box
                sx={{ bgcolor: "#cccccc", height: "80vh", color: "#FFFFFF" }}
                id="iframeContainer"
              >
                <iframe
                  id="pdfView"
                  src=""
                  width="100%"
                  height="100%"
                  border="0"
                ></iframe>
              </Box>
              <div>
                <Button onClick={makePdf} data-cy="updatepdfbutton">
                  Update PDF
                </Button>
              </div>
            </Grid>
          </Split>
        </Box>
      </Grid>
    </>
  );
};

export default CodeEditor;
