import { useEffect, useState } from 'react';
import useRole from 'Hooks/useRole';
import useStaff from 'Hooks/useStaff';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Typography } from '@mui/material';
import { toast, Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AssignRole = () => {
  const { getRoles, roles, staffRoles, getStaffRoles, assignUserRole,roleLoader } = useRole();
  const { getStaffByUserName, staffByName, isLoading, isSucc } = useStaff();

  const [staffName, setStaffName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  console.log('staffhehe', isSucc);
  const handleSearch = e => {
    e.preventDefault();
    console.log('first');
    getStaffByUserName(staffName);
  };

  const assignRole = e => {
    e.preventDefault();
    const assignedRolesData = selectedRoles.map(roleId => ({
      user_id: staffByName._id,
      role_id: roleId,
      user_name: staffByName.username,
      role_name: roles.find(role => role._id == roleId)?.role_name
    }));

    assignUserRole(assignedRolesData);
  };

  useEffect(() => {
  
     
       getStaffRoles(staffByName._id);
    
  }, [staffByName._id]);
  useEffect(() => {
  
    getRoles();
   
 
}, []);


  useEffect(() => {
    if (staffRoles && staffRoles.length > 0) {
      const initialRoles = staffRoles.map(role => role.role_id);
      setSelectedRoles(initialRoles);
    }
  }, []);

  return (
    <>
    <ToastContainer/>
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
          <button
            className="text-white flex justify-center  mt-2 gap-x-2 items-center px-4 py-2 bg-yellow-700 w-auto lg:h-[40px] text-base border-t-2 "
            // disabled={id && inspector && clean_hours}
            disabled={isLoading}
            onClick={e => {
              handleSearch(e);
            }}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
          {/* <Button
            variant="contained"
            style={{ marginTop: 20 }}
            onClick={e => {
              handleSearch(e);
            }}
          >
            Search
          </Button> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isSucc &&
                  roles?.map(item => (
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <button
            className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 "
            // disabled={id && inspector && clean_hours}
            disabled={roleLoader}
            onClick={e => {
              assignRole(e);
            }}
          >
            {roleLoader ? 'Loading...' : 'Assign'}
          </button>
          {/* <Button
            variant="contained"
            style={{marginTop: 20}}
            onClick={e => {
              assignRole(e);
            }}
          >
            Assign
          </Button> */}
        </form>
      </div>
    </>
  );
};

export default AssignRole;
