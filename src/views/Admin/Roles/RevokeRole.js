import { useParams } from "react-router-dom";
import useRole from "Hooks/useRole";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const RevokeRole = () => {
  const { staffId } = useParams();
  const { staffRoles, getStaffRoles, revokeUserRole } = useRole();
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getStaffRoles(staffId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (staffRoles && staffRoles.length > 0) {
      const initialRoles = staffRoles.map((role) => role.role_id);
      setSelectedRoles(initialRoles);
    }
  }, []);

  const handleRoleChange = (roleId) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles((prevRoles) =>
        prevRoles.filter((prevRoleId) => prevRoleId !== roleId)
      );
    } else {
      setSelectedRoles((prevRoles) => [...prevRoles, roleId]);
    }
  };

  const handleRevoke = async () => {
    const dataToPass = { userId: staffId, roleIds: selectedRoles };
    await revokeUserRole(dataToPass);
  };

  return (
    <div className="add-user-container">
      <div className="add-user-header">
        <Typography variant="h2">Revoke Role</Typography>
      </div>
      {staffRoles ? (
        <form>
          <div className="table-section">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffRoles.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRoles.includes(item.role_id)}
                        onChange={() => handleRoleChange(item.role_id)}
                      />
                      {item.role_name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRevoke}
            style={{ marginTop: "12px" }}
          >
            Revoke Role
          </Button>
        </form>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default RevokeRole;
