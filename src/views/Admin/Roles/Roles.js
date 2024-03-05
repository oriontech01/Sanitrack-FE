import React, { useEffect, useState } from 'react';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useRole from 'Hooks/useRole';
import Loader from 'component/Loader/Loader';

const Roles = () => {
  const navigate = useNavigate();
  const { getRoles, roles, deleteRole } = useRole();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getRoles();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreateNavigate = () => {
    navigate('/dashboard/roles/create');
  };

  const handleAssignNavigate = () => {
    navigate('/dashboard/roles/assign');
  };

  const handleRoomDelete = async roleId => {
    await deleteRole(roleId);
  };

  const handleViewPermissions = roleId => {
    navigate(`/dashboard/roles/permissions/${roleId}`);
  };

  const handleViewNavigate = () => {
    navigate('/dashboard/roles/staff');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom textAlign={{ xs: 'center', sm: 'left' }}>
              All Roles
            </Typography>
            <Box sx={{ mt: { xs: 2, sm: 0 }, textAlign: 'center'}}>
              <Button
                variant="contained"
                onClick={handleCreateNavigate}
                style={{ backgroundColor: 'blue' }}
                sx={{ mr: 1, '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                Create New Role
              </Button>
              <Button
                variant="contained"
                onClick={handleAssignNavigate}
                style={{ backgroundColor: 'blue' }}
                sx={{ mr: 1, '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                Assign Role
              </Button>
              <Button
                variant="contained"
                onClick={handleViewNavigate}
                style={{ backgroundColor: 'blue' }}
                sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}
              >
                View Staff Role
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table id="taskTable">
                <TableHead>
                  <TableRow>
                    <TableCell>Role Id</TableCell>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles ? (
                    roles.map(item => (
                      <TableRow key={item._id}>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.role_name}</TableCell>
                        <TableCell style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
                          <Button onClick={() => handleViewPermissions(item._id)}>View Permissions</Button>
                          <Button color="error" onClick={() => handleRoomDelete(item._id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No roles available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Roles;
