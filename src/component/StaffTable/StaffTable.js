import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStaff from "Hooks/useStaff";
import { useState } from "react";

const StaffTable = ({ allStaffs }) => {
  const [flag, setFlag] = useState("");
  const { fireStaff, restoreStaff } = useStaff();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Table sx={{ minWidth: matchesSmallScreen ? 300 : 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            {!matchesSmallScreen && <TableCell>Email</TableCell>}
            {!matchesSmallScreen && <TableCell>Phone Number</TableCell>}
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allStaffs.length > 0 ? (
            allStaffs.map((staff) => (
              <TableRow key={staff._id}>
                <TableCell className="capitalize">
                  {staff.username}
                  {matchesSmallScreen && (
                    <>
                      <Typography variant="body2">Email: {staff.email}</Typography>
                      <Typography variant="body2">Phone: {staff.phone_number}</Typography>
                    </>
                  )}
                </TableCell>
                {!matchesSmallScreen && <TableCell>{staff.email}</TableCell>}
                {!matchesSmallScreen && <TableCell>{staff.phone_number}</TableCell>}
                <TableCell>
                  {staff.flag === "INACTIVE" ? (
                    <Button variant="contained" style={{backgroundColor: 'blue'}} onClick={() => handleRestore(staff._id)}>
                      Restore
                    </Button>
                  ) : (
                    <Button variant="contained" style={{backgroundColor: 'red'}} onClick={() => handleFire(staff._id)}>
                      Disengage
                    </Button>
                  )}
                  {/* Consider adding view role functionality for small screens if needed */}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={matchesSmallScreen ? 2 : 4}>
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
