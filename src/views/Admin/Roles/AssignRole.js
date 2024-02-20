import { useEffect, useState } from 'react';
import useRole from 'Hooks/useRole';
import useStaff from 'Hooks/useStaff';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Typography } from '@mui/material';

const AssignRole = () => {
  const { getRoles, roles, staffRoles, getStaffRoles, assignUserRole } = useRole();
  const { getStaffByUserName, staffByName } = useStaff();

  const [staffName, setStaffName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleSearch = async e => {
    e.preventDefault();
    await getStaffByUserName(staffName);
  };

  const assignRole = async e => {
    e.preventDefault();
    const assignedRolesData = selectedRoles.map(roleId => ({
      user_id: staffByName._id,
      role_id: roleId,
      user_name: staffByName.username,
      role_name: roles.find(role => role._id == roleId)?.role_name
    }));

    await assignUserRole(assignedRolesData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getRoles();
      await getStaffRoles(staffByName._id);
    };
    if (staffByName?._id?.length > 0) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (staffRoles && staffRoles.length > 0) {
      const initialRoles = staffRoles.map(role => role.role_id);
      setSelectedRoles(initialRoles);
    }
  }, []);

  return (
    <>
      <div className="add-user-container">
        <div className="add-user-header">
          <Typography variant="h2">Assign Role</Typography>
        </div>
        <form>
          <TextField
            fullWidth
            label="Staff Name"
            style={{ marginTop: 20 }}
            type="text"
            name="Enter Staff Name"
            placeholder="Search for staff by username"
            onChange={e => setStaffName(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginTop: 20 }}
            onClick={e => {
              handleSearch(e);
            }}
          >
            Search
          </Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffByName ? (
                  roles.map(item => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRoles.includes(item._id)}
                          onChange={() => {
                            setSelectedRoles(prevRoles => {
                              const roleId = item._id;

                              if (prevRoles.includes(roleId)) {
                                return prevRoles.filter(prevRoleId => prevRoleId !== roleId);
                              } else {
                                return [...prevRoles, roleId];
                              }
                            });
                          }}
                        />
                        {item.role_name}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No roles available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            style={{marginTop: 20}}
            onClick={e => {
              assignRole(e);
            }}
          >
            Assign
          </Button>
        </form>
      </div>
    </>
  );
};

export default AssignRole;
