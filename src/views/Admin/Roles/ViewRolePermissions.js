import { useParams } from 'react-router-dom';
import usePermission from 'Hooks/usePermission';
import { useEffect } from 'react';
import PermissionTable from '../Permissions/PermissionsTable';
import { CircularProgress, Typography } from '@mui/material';

const ViewRolePermissions = () => {
  const { id } = useParams();
  const roleId = id;
  console.log('USE PARAMS', useParams());
  const { getPermissionByRole, rolePermissions } = usePermission();

  useEffect(() => {
    const fetchPermission = async () => {
      await getPermissionByRole(roleId);
    };
    fetchPermission();
  }, [roleId]);

  return (
    <div>
      <Typography variant="h2">Role Permissions</Typography>
      {rolePermissions !== null ? (
        <div>
          {typeof rolePermissions === 'string' ? (
            <Typography variant="body1">{rolePermissions}</Typography>
          ) : (
            <PermissionTable permissions={rolePermissions} showButton={false} showRevoke={true} showCheckBox={true} roleId={roleId} />
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ViewRolePermissions;
