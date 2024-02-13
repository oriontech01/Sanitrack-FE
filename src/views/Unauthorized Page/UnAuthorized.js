import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const UnAuthorized = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <Typography variant="h1" gutterBottom>
          Unauthorized!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          You are unauthorized to access this application.
          <br />
          Please download our mobile app to continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="#"
          onClick={() => window.open('https://example.com/mobile-app')}
        >
          Download Mobile App
        </Button>
      </motion.div>
    </Box>
  );
};

export default UnAuthorized;
