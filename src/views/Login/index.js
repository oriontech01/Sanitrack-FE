import { Link as RouterLink } from 'react-router-dom';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// project import
import AuthLogin from './Login';

// assets
import Logo from 'assets/images/msslogo.png';
import LoginBg from 'assets/images/login-bg-main.png';
import RoleModal from './RoleModal';
import ModalComponent from 'component/Modals/Modal';
import { useAuthRolesState } from 'context/AuthRolesContext';

// ==============================|| LOGIN ||============================== //

const Login = () => {
  const { modal } = useAuthRolesState();
  const [isModalOpen, setIsModalOpen] = useState(modal);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const theme = useTheme();

  return (
    <div
      className="flex justify-center items-center h-screen  w-full "
      style={{ backgroundImage: `url(${LoginBg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
    >
      {' '}
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={11} sm={7} md={6} lg={4}>
          <Card
          className='shadow-2xl'
            sx={{
              overflow: 'visible',
              display: 'flex',
              position: 'relative',
              '& .MuiCardContent-root': {
                flexGrow: 1,
                flexBasis: '50%',
                width: '50%'
              },
              maxWidth: '475px',
              margin: '24px auto',
           
            }}
          >
            <CardContent sx={{ p: theme.spacing(5, 4, 3, 4) }}>
              <Grid container direction="column" spacing={4} justifyContent="center">
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography color="textPrimary" gutterBottom variant="h2">
                        Sign in
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        To Sanitrack Web
                      </Typography>
                    </Grid>
                    <Grid item>
                      <RouterLink to="/">
                        <img alt="Auth method" src={Logo} />
                      </RouterLink>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <AuthLogin />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ModalComponent isOpen={modal} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        <RoleModal closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default Login;
