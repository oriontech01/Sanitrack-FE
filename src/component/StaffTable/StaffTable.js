import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStaff from "Hooks/useStaff";
import { useState } from "react";

const StaffTable = ({ allStaffs }) => {
  const [flag, setFlag] = useState("");
  const { fireStaff, restoreStaff } = useStaff();
  const navigate = useNavigate();

  const handleViewRole = (staffId) => {
    navigate(`/dashboard/user/role/${staffId}`);
  };

  const handleFire = async (staffId) => {
    await fireStaff(staffId);
    setFlag("INACTIVE");
  };

  const handleRestore = async (staffId) => {
    await restoreStaff(staffId);
    setFlag("ACTIVE");
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allStaffs ? (
            allStaffs.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell>{staff.username}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phone_number}</TableCell>
                <TableCell>
                  {staff.flag === "INACTIVE" ? (
                    <Button variant="contained" className="view-btn" onClick={() => handleRestore(staff._id)}>
                      Restore
                    </Button>
                  ) : (
                    <Button variant="contained" style={{backgroundColor: 'red'}} onClick={() => handleFire(staff._id)}>
                      Disengage
                    </Button>
                  )}
                  {/* <Button variant="contained" className="view-btn" onClick={() => handleViewRole(staff._id)}>View Role</Button> */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography>No staff available.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StaffTable;
