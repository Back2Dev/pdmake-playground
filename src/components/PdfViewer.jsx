import React,{ useState} from 'react'
import { Box, Button } from '@mui/material';
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const PdfViewer = () => {
  const [doc, setDoc] = useState({})
  const handleDownloadClick = (e) => { 
    e.preventDefault();
    const pdfDocGenerator = pdfMake.createPdf(doc).download()
  }
  const handlePrintClick = (e) => {
    const pdfDocGenerator = pdfMake.createPdf(doc).print({}, window)
  }
  return (
    <>
      <Box sx={{ bgcolor: '#cccccc', height: '80vh', color: '#FFFFFF' }} id="iframeContainer">
        <iframe id="pdf-viewer" />
      </Box>
      <Button onClick={handleDownloadClick}>Download</Button>
      <Button onClick={handlePrintClick}>Print</Button>
    </>
  )
}

export default PdfViewer

