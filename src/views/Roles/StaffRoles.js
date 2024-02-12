import { useEffect, useState } from 'react';
import useRole from '../../Hooks/useRole';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const StaffRoles = () => {
  const navigate = useNavigate();
  const { getRoleForStaff, roleForStaff } = useRole();
  const [userRoles, setUserRoles] = useState([]);

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

  const handleRoleRevoke = staffId => {
    navigate(`/dashboard/roles/staff/revoke/${staffId}`);
  };

  const handleViewPermissions = () => {
    navigate('/dashboard/permissions');
  };

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
                {userRoles ? (
                  userRoles.map(item => (
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
                            onClick={() => {
                              handleRoleRevoke(item._id);
                            }}
                          >
                            Revoke
                          </Button>
                        </div>
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
        </div>
      </div>
    </div>
  );
};

export default StaffRoles;
