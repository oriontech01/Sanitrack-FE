import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box, TablePagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStaff from "Hooks/useStaff";
import StaffTable from "component/StaffTable/StaffTable";
import Loader from "component/Loader/Loader";

const Users = () => {
  const navigate = useNavigate();
  const { getAllStaffs, allStaffs, isLoading } = useStaff();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Effect to fetch all staff members
  useEffect(() => {
    getAllStaffs();
  }, []); // Fetch staff members only once

  const handleNavigate = () => {
    navigate("/dashboard/add-user");
  };

  // Handle change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the current slice of staffs to display
  const currentStaffs = allStaffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center" paddingTop={5} paddingBottom={5}>
            <Typography variant="h2">All Staffs</Typography>
            <Button variant="contained" onClick={handleNavigate}>
              Create New Staff
            </Button>
          </Box>
          <StaffTable allStaffs={currentStaffs} />
          <TablePagination
            component="div"
            count={allStaffs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 100]}
          />
        </Container>
      )}
    </Container>
  );
};

export default Users;
