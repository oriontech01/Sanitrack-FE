import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usePermission from 'Hooks/usePermission';
import { useEffect } from 'react';
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

  console.log('Permissions', allPermissions);

  return (
    <Container className="tab-display">
      <Container>
        <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
          <Typography variant="h2" gutterBottom>
            All Permissions
          </Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleCreateNavigate} sx={{ mr: 1 }}>
              Create New Permission
            </Button>
            <Button variant="contained" color="primary" onClick={handleAssignNavigate}>
              Assign Permission
            </Button>
          </Box>
        </Box>

        <PermissionTable permissions={allPermissions} showCheckBox={false} showButton={false} showRevoke={false} roleId={0} />
      </Container>
    </Container>
  );
};

export default Permissions;
