import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import React from 'react';

const ContactForm = ({ closeModal }) => {
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          transformOrigin: 'top'
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <form>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField fullWidth label="First Name" variant="outlined" value="" />
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Box sx={{ mb: 2 }}>
                <TextField fullWidth label="Last Name" variant="outlined" value="" />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2 }}>
            <TextField fullWidth label="Email" variant="outlined" value="" />
          </Box>
          <Box sx={{ mb: 2 }}>
            <textarea
              id="message"
              name="message"
              placeholder='Message'
              rows={3}
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </Box>
          <div className="p-2 w-full flex justify-end">
              <button
                className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
                href="/contact"
              >
                Send Message
              </button>{" "}
            </div>
        </form>
      </Container>
    </>
  );
};

export default ContactForm;
