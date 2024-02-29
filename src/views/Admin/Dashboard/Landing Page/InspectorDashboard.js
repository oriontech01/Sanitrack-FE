import React from 'react'
import {Box, Typography} from '@mui/material'

const InspectorDashboard = () => {
  return (
    <Box>
      <Typography variant="h2" color="blue">
        Welcome {localStorage.getItem('name')}!
      </Typography>
      <Typography variant="body1" marginTop={2}>
        Below are the locations for the tasks of the day.
      </Typography>
    </Box>
  )
}

export default InspectorDashboard