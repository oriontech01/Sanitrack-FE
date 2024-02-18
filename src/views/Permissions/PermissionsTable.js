import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, Box, TableRow, Checkbox, Button, Typography, TablePagination } from '@mui/material';
import { styled } from '@mui/system';
import usePermission from '../../Hooks/usePermission';
import chunkArray from '../../utils/chunkArray';

const CheckAllContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PermissionTable = ({ permissions, showCheckBox, showButton, roleId, showRevoke }) => {
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const { assignPermission, revokePermission } = usePermission();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2); // Number of chunks per page

  const chunkedPermissions = chunkArray(permissions, 5);
  const visibleChunks = chunkedPermissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCheckAll = () => {
    if (checkedPermissions.length === permissions.length) {
      setCheckedPermissions([]);
    } else {
      setCheckedPermissions(permissions.map(permission => permission._id));
    }
  };

  const handleCheckBoxChange = (permissionId) => {
    setCheckedPermissions((prevChecked) => {
      if (prevChecked.includes(permissionId)) {
        return prevChecked.filter((id) => id !== permissionId);
      } else {
        return [...prevChecked, permissionId];
      }
    });
  };

  const assignPermissions = async (e) => {
    e.preventDefault();
    await assignPermission({
      // Your existing logic
    });
  };

  const revokePermissions = async (e) => {
    e.preventDefault();
    await revokePermission({
      // Your existing logic
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <Box padding={2} display={'grid'} gap={2} alignContent={'center'} justifyContent={'center'} gridTemplateColumns={`repeat(${rowsPerPage}, 1fr)`}>
            {visibleChunks.map((chunk, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell colSpan={showCheckBox ? 2 : 1}>
                    <Typography variant="h6">Group {page * rowsPerPage + index + 1}</Typography>
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
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={chunkedPermissions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[1, 2, 3, 5]}
      />

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
