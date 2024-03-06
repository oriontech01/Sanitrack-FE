import React, { useEffect } from 'react';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usePermission from 'Hooks/usePermission';
import PermissionTable from './PermissionsTable';

const Permissions = () => {
  const { allPermissions, getPermissions } = usePermission();
  const navigate = useNavigate();

  const handleCreateNavigate = () => {
    navigate('/dashboard/permissions/create');
  };

  const handleAssignNavigate = () => {
    navigate('/dashboard/permissions/assign');
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPermissions();
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }}>
          <Typography variant="h4" gutterBottom component="div" sx={{ mb: { xs: 2, sm: 0 } }}>
            All Permissions
          </Typography>
          <Box  display={'flex'} justifyContent={'center'} alignContent={'center'} flexDirection={'column'} padding={2} gap={5}>
            <Button 
              variant="contained" 
              onClick={handleCreateNavigate}
              style={{backgroundColor: 'blue'}} 
            >
              Create New Permission
            </Button>
            <Button 
              variant="contained" 
              style={{backgroundColor: 'blue'}} 
              onClick={handleAssignNavigate}
            >
              Assign Permission
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <PermissionTable permissions={allPermissions} showCheckBox={false} showButton={false} showRevoke={false} roleId={0} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Permissions;
