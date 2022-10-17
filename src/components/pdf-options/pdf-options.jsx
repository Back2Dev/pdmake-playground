import React from 'react'
import { Box, Button } from '@mui/material'
import EditorContext from "../context/provider";

const PdfOptions = () => {
  const { code, setCode } = React.useContext(EditorContext);

  let dd
  const printDoc = () => {

    const doc = eval(code)
    pdfMake.createPdf(doc).print()
  }

  const openDoc = () => {
    const doc = eval(code)
    pdfMake.createPdf(doc).open()
  }
  const downloadDoc = () => {
    const doc = eval(code)
    pdfMake.createPdf(doc).download()
  }

  return (
    <>
      <Box mr='15px' id="pdf-options" fontWeight="bold" marginRight="4rem">
        <Button variant="text" onClick={openDoc} id='open-pdf' sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize: "0.65rem" }}>OPEN</Button>
        <Button variant="text" onClick={printDoc} id='print-pdf' sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize: "0.65rem" }}>PRINT</Button>
        <Button variant="text" onClick={downloadDoc} id='download-pdf' sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize: "0.65rem" }}>DOWNLOAD</Button>
      </Box>
    </>
  )
}

export default PdfOptions