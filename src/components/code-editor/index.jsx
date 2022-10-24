import React, { useEffect } from 'react'
import CodeEditor from './code-editor';
import Preview from './preview';
import EditorContext from './provider';
import Split from "react-split";
import { Box, Grid } from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Playground = () => {
  const { code, setErr, setDirty } = React.useContext(EditorContext)
  let dd = {};
  const makePdf = () => {
    try {
      console.log(code);
      const docDefinition = eval(code);
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getDataUrl((dataUrl) => {
        const targetElement = document.getElementById("pdfView");
        targetElement.src = dataUrl;
        setErr("");
        setDirty(false)
      });
    } catch (e) {
      console.log("error message: ", e);
      setErr(`Error: ${e.message}`);
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (dirty) {
  //       makePdf();
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    makePdf()
  }, [code]);
  return (
    <>
      <Grid container className="main-area">
        <Box width="100vw">
          <Split className="split">
            <Grid item>
              <Box sx={{ bgcolor: "#2a313e", height: "100%", color: "#ffffff" }}>
                <CodeEditor />
              </Box>
            </Grid>
            <Grid item>
              <Preview />
            </Grid>
          </Split>
        </Box>
      </Grid>
    </>
  )
}

export default Playground