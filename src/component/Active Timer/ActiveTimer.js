import React from 'react';
import { Grid, Typography, Box, Divider } from '@mui/material';

const ActiveTimer = () => {
  return (
    <Box sx={{ padding: 2, margin: '16px 0' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} container justifyContent="flex-end" direction="column" alignItems="flex-end">
          <Typography variant="body2" sx={{ alignSelf: 'flex-end' }}>
            21/2/24
          </Typography>
          <Typography variant="h5" color="primary" sx={{ alignSelf: 'flex-start' }}>
            05:45:23
          </Typography>
          <Typography variant="body2" sx={{ alignSelf: 'flex-start' }}>
            Discovery Mall - Board Room
          </Typography>
        </Grid>
        <Divider/>

        <Grid item xs={12} sm={6} container justifyContent="flex-end" direction="column" alignItems="flex-end">
          <Typography variant="body2" sx={{ alignSelf: 'flex-end' }}>
            21/2/24
          </Typography>
          <Typography variant="h5" color="primary" sx={{ alignSelf: 'flex-start' }}>
            05:45:23
          </Typography>
          <Typography variant="body2" sx={{ alignSelf: 'flex-start' }}>
            Discovery Mall - Board Room
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActiveTimer;