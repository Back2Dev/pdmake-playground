import React from 'react'
import { Box, Button } from '@mui/material'

const SampleFiles = () => {
  const sampleFiles = ['BASICS', 'STYLE1', 'STYLE2', 'STYLE3', 'COLUMNS', 'TABLES', 'LISTS', 'MARGIN', 'IMAGES']
  const openDoc = (e) => {
    console.log(e.target.value)
  }
  return (
    <>
      <Box mr='15px' id="pdf-options" fontWeight="bold" marginRight="4rem">
        {sampleFiles.map(sample => {
          return (
            <Button key={sample} value={sample} variant="text" onClick={openDoc} sx={{ my: 2, color: 'white', fontWeight: "bold", fontSize: "0.65rem" }}>{sample}</Button>
          )
        }
        )}
      </Box>
    </>
  )
}

export default SampleFiles