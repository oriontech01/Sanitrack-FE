import { useTheme } from '@emotion/react';
import { EmailOutlined, PhoneCallback } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  
  Grid,
  
  Typography
} from '@mui/material';

import React, { useState } from 'react';

import ContactForm from './ContactForm';
import ModalComponent from 'component/Modals/Modal';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h2" gutterBottom>
              Contact Us
            </Typography>

            <Grid container spacing={4}>
              <Grid item lg={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="h3" sx={{ color: theme.palette.primary.dark }}>
                          Send an Email
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
                          sanitrack@mail.com
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="h2"
                          sx={{
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '6px'
                          }}
                        >
                          <Button sx={{ minWidth: { sm: 50, xs: 35 } }}  onClick={openModal} color="inherit">
                            <EmailOutlined color="primary" />
                          </Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box sx={{ background: theme.palette.primary.dark }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      sx={{
                        textAlign: 'center',
                        padding: theme.spacing(1.2),
                        pl: 2.5,
                        pr: 2.5,
                        color: theme.palette.common.white
                      }}
                    ></Grid>
                  </Box>
                </Card>
              </Grid>
              <Grid item lg={4} sm={6} xs={12}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Typography variant="h3" sx={{ color: theme.palette.error.main }}>
                          Call Us
                        </Typography>
                        <a href="tel:6031112298">
                          {' '}
                          <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
                            (+1) 234 567 8901
                          </Typography>
                        </a>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="h2"
                          sx={{
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '6px'
                          }}
                        >
                          <PhoneCallback color={theme.palette.error.main} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Box sx={{ background: theme.palette.error.main }}>
                    <Grid
                      container
                      justifyContent="space-between"
                      sx={{
                        textAlign: 'center',
                        padding: theme.spacing(1.2),
                        pl: 2.5,
                        pr: 2.5,
                        color: theme.palette.common.white
                      }}
                    ></Grid>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
      >
        <ContactForm  closeModal={closeModal}/>
      </ModalComponent>

     
    </Grid>
  );
};

export default Contact;
