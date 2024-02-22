import { useEffect, useState } from 'react';
import useRole from 'Hooks/useRole';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const StaffRoles = () => {
  const navigate = useNavigate();
  const { getRoleForStaff, roleForStaff } = useRole();
  const [userRoles, setUserRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      await getRoleForStaff();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const uniqueUserRoles = [];
    roleForStaff.forEach(userRole => {
      const existingUser = uniqueUserRoles.find(u => u._id === userRole._id);

      if (!existingUser) {
        uniqueUserRoles.push({ ...userRole, role_name: [userRole.role_name] });
      } else {
        existingUser.role_name.push(userRole.role_name);
      }
    });
    setUserRoles(uniqueUserRoles);
  }, [roleForStaff]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page with new number of rows
  };

  const handleRoleRevoke = staffId => {
    navigate(`/dashboard/roles/staff/revoke/${staffId}`);
  };

  const handleViewPermissions = () => {
    navigate('/dashboard/permissions');
  };

  // Calculate the current slice of user roles to display
  const currentRoles = userRoles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <div className="task-section">
            <h2>Staff Roles</h2>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Staff Name</TableCell>
                  <TableCell>Role Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRoles.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.role_name.join(', ')}</TableCell>
                    <TableCell>
                      <div className="btn-group">
                        <Button variant="contained" onClick={handleViewPermissions}>
                          View Permissions
                        </Button>
                        <Button
                          variant="contained"
                          style={{ margin: 10 }}
                          onClick={() => handleRoleRevoke(item._id)}
                        >
                          Revoke
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={userRoles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffRoles;
