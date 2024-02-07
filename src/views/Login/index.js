import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// project import
import AuthLogin from './Login';

// assets
import Logo from 'assets/images/msslogo.png';

// ==============================|| LOGIN ||============================== //

const Login = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: theme.palette.common.black, height: '100%', minHeight: '100vh' }}
    >
      <Grid item xs={11} sm={7} md={6} lg={4}>
        <Card
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
            margin: '24px auto'
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
                      To Sanitrack
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
  );
};

export default Login;