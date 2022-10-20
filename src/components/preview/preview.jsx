import React from 'react'
import { Box } from '@mui/material'

const Preview = () => {
  return (
    <>
      <Box
        sx={{ bgcolor: "#cccccc", height: "100%", color: "#FFFFFF" }}
        id="iframeContainer"
      >
        <iframe id="pdfView" src="" data-cy="pdfmake"></iframe>
      </Box>
    </>
  )
}

export default Preview