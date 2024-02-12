import { useEffect, useState } from 'react';
import { Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import useRole from '../../Hooks/useRole';
import usePermission from '../../Hooks/usePermission';
import PermissionTable from './PermissionsTable';

const AssignPermission = () => {
  const { getRoles, roles } = useRole();
  const { getPermissions, allPermissions } = usePermission();
  const [selectedRoleId, setSelectedRoleId] = useState('Select Role');

  useEffect(() => {
    getRoles();
    getPermissions();
  }, []);

  console.log('Roles', roles);

  const handleRoleChange = e => {
    setSelectedRoleId(e.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Assign Permission</Typography>
      </Grid>
      <Grid item xs={12}>
        <InputLabel>Select Role</InputLabel>
        <FormControl fullWidth>
          <Select value={selectedRoleId} onChange={handleRoleChange}>
            {roles ? (
              roles.map(role => (
                <MenuItem key={role._id} value={role._id}>
                  {role.role_name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No roles</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {roles ? (
          <PermissionTable permissions={allPermissions} showCheckBox={true} showButton={true} showRevoke={false} roleId={selectedRoleId} />
        ) : (
          <Typography variant="body1">No Permissions</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default AssignPermission;
