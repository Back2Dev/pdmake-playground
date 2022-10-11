import React from 'react'
import { Box, Button } from '@mui/material'

const PdfOptions = () => {

  // let newValue =  localStorage.getItem('value');
  // let doc = eval(newValue)

  let dd
  const printDoc = () => {
    const value = localStorage.getItem('myValue') || ''
    const doc = eval(value)
    pdfMake.createPdf(doc).print()
  }

  const openDoc = () => {
    const value = localStorage.getItem('myValue') || ''
    const doc = eval(value)
    pdfMake.createPdf(doc).open()
  }
  const downloadDoc = () => {
    const value = localStorage.getItem('myValue') || ''
    const doc = eval(value)
    pdfMake.createPdf(doc).download()
  }

  return (
    <>
      <Box mr='15px' id="pdf-options" fontWeight="bold" marginRight="4rem">
        <Button variant="text" onClick={openDoc} id='open-pdf' sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize:"0.65rem" }}>OPEN</Button>
        <Button variant="text" onClick={printDoc} id='print-pdf' sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize: "0.65rem" }}>PRINT</Button>
        <Button variant="text" onClick={downloadDoc} id='download-pdf' sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize: "0.65rem" }}>DOWNLOAD</Button>
      </Box>
    </> 
  )
}

export default PdfOptions