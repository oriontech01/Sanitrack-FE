import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRole from '../../Hooks/useRole';
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

  const handleViewPermissions = async roleId => {
    navigate(`/dashboard/roles/permissions/${roleId}`);
  };

  const handleViewNavigate = async () => {
    navigate('/dashboard/roles/staff');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container className="tab-display">
      <Box>
        <Container maxWidth="md">
          <Box display={'flex'} textAlign={'center'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="h2" gutterBottom>
              All Roles
            </Typography>
            <Box>
              <Button variant="contained" onClick={handleCreateNavigate} sx={{ mr: 1 }}>
                Create New Role
              </Button>
              <Button variant="contained" onClick={handleAssignNavigate} sx={{ mr: 1 }}>
                Assign Role
              </Button>
              <Button variant="contained" onClick={handleViewNavigate}>
                View Staff Role
              </Button>
            </Box>
          </Box>

          <TableContainer style={{ marginTop: 20 }}>
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
                      <TableCell>
                        <div>
                          <Button onClick={() => handleViewPermissions(item._id)}>View Permissions</Button>
                          <Button color="secondary" onClick={() => handleRoomDelete(item._id)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="3">No roles available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Container>
  );
};

export default Roles;
