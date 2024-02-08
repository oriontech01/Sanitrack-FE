import { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStaff from "../../Hooks/useStaff";
import StaffTable from "../../component/StaffTable/StaffTable";
import Loader from "component/Loader/Loader";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100; // Change this number based on your preference
  const navigate = useNavigate();
  const { getAllStaffs, allStaffs, fireStaff, restoreStaff, isLoading } = useStaff();

  useEffect(() => {
    getAllStaffs(currentPage, itemsPerPage);
  }, []); // Dependency array is empty to fetch staffs only on component mount

  const handleNavigate = () => {
    navigate("/dashboard/add-user");
  };

  // Before rendering, check if allStaffs is defined and has length
  return (
    <Container className="tab-display">
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="center-me">
          <Container className="container">
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography paddingTop={5} paddingBottom={5} variant="h2">All Staffs</Typography>
              <Button variant="contained" id="createTaskBtn" onClick={handleNavigate}>
                Create New Staff
              </Button>
            </Box>
            <StaffTable allStaffs={allStaffs}></StaffTable>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export default Users;
