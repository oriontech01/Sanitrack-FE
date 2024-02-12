import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, Box, TableRow, Checkbox, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import usePermission from '../../Hooks/usePermission';
import chunkArray  from '../../utils/chunkArray';

const CheckAllContainer = styled('div')({
  marginBottom: 12,
});

const PermissionTable = ({ permissions, showCheckBox, showButton, roleId, showRevoke }) => {
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const { assignPermission, revokePermission } = usePermission();

  const chunkedPermissions = chunkArray(permissions, 5);

  const handleCheckAll = () => {
    if (checkedPermissions.length === permissions.length) {
      setCheckedPermissions([]);
    } else {
      setCheckedPermissions(permissions.map(permission => permission._id));
    }
  }

  const handleCheckBoxChange = (permissionId) => {
    setCheckedPermissions((prevChecked) => {
      if (prevChecked.includes(permissionId)) {
        return prevChecked.filter((id) => id !== permissionId);
      } else {
        return [...prevChecked, permissionId];
      }
    });
  }

  const assignPermissions = async (e) => {
    e.preventDefault()
    const dataToPass = {
      role_id: roleId,
      permissions: checkedPermissions.map((permissionId) => {
        const selectedPermission = permissions.find((permission) => permission._id === permissionId);
        return {
          permission_id: permissionId,
          permission_name: selectedPermission ? selectedPermission.permission_name : '',
        };
      }),
    };
    await assignPermission(dataToPass)
  }

  const revokePermissions = async (e) => {
    e.preventDefault()
    const dataToPass = {
      role_id: roleId,
      permissions: checkedPermissions.map((permissionId) => {
        const selectedPermission = permissions.find((permission) => permission._id === permissionId);
        return {
          permission_id: selectedPermission.permission_id ? selectedPermission.permission_id : '',
          permission_name: selectedPermission ? selectedPermission.permission_name : '',
        };
      }),
    };
    await revokePermission(dataToPass)
  }

  return (
    <Box>
      {showCheckBox && (
        <CheckAllContainer>
          <Checkbox
            checked={checkedPermissions.length === permissions.length}
            onChange={handleCheckAll}
          />
          <Typography variant="body1">Check All</Typography>
        </CheckAllContainer>
      )}

      <TableContainer>
        <Table>
          {permissions ? (
            <Box padding={5} display={'grid'} gap={5} alignContent={'center'} justifyContent={'center'} gridTemplateColumns={`repeat(2, 1fr)`}>
              {chunkedPermissions.map((chunk, index) => (
                <TableBody key={index}>
                  <TableRow>
                    <TableCell colSpan={showCheckBox ? 2 : 1}>
                      <Typography variant="h6">Table {index + 1}</Typography>
                    </TableCell>
                  </TableRow>
                  {chunk.map((permission, innerIndex) => (
                    <TableRow key={innerIndex}>
                      {showCheckBox ? (
                        <>
                          <TableCell>
                            <Checkbox
                              checked={checkedPermissions.includes(permission._id)}
                              onChange={() => handleCheckBoxChange(permission._id)}
                            />
                          </TableCell>
                          <TableCell>{permission.permission_name}</TableCell>
                        </>
                      ) : (
                        <TableCell>{permission.permission_name}</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              ))}
            </Box>
          ) : (
            <TableRow>
              <TableCell colSpan={showCheckBox ? 2 : 1}>
                <Typography variant="body1">No permissions available.</Typography>
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>

      {showButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={assignPermissions}
          disabled={roleId === 'Select Role' || checkedPermissions.length < 1}
          style={{ marginTop: 12 }}
        >
          Assign
        </Button>
      )}

      {showRevoke && (
        <Button
          variant="contained"
          color="secondary"
          onClick={revokePermissions}
          disabled={roleId === 'Select Role' || checkedPermissions.length < 1}
          style={{ marginTop: 12 }}
        >
          Revoke Permission
        </Button>
      )}
    </Box>
  );
};

export default PermissionTable;
