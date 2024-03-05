import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, TablePagination, Tabs, Tab } from '@mui/material';
import useStaff from 'Hooks/useStaff';
import StaffTable from 'component/StaffTable/StaffTable';
import Loader from 'component/Loader/Loader';
import TabPanel from 'component/Tab Panel/TabPanel';
import AddUser from './AddUser';

const Users = () => {
  const { isLoading, getAllCleaners, allCleaners, getAllInspectors, allInspectors } = useStaff();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Effect to fetch all staff members
  useEffect(() => {
    getAllCleaners();
    getAllInspectors();
  }, []); // Fetch staff members only once

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
  const currentCleaners = allCleaners?.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const currentInspectors = allInspectors?.reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <AddUser isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
          <Box display="flex" justifyContent="space-between" alignItems="center" paddingTop={5} paddingBottom={5}>
            <Typography variant="h2">Users</Typography>
            <Button 
              variant='contained'
              onClick={() => {
                setIsModalOpen(true);
                console.log('Clicked');
                console.log(isModalOpen)
              }}
              style={{ backgroundColor: 'blue' }}
            >
              Add New +
            </Button>
          </Box>

          <Tabs
            centered
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Cleaners and Inspectors"
            sx={{
              backgroundColor: 'lightgray',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // subtle shadow
              '.MuiTabs-indicator': {
                display: 'none' // Hide the default indicator
              },
              '& .MuiTab-root': {
                // Apply styles to all tabs
                width: '50%', // Equal width for symmetry
                borderRadius: '10px', // rounded corners for the first tab
                '&:last-of-type': {
                  borderRadius: '10px' // rounded corners for the last tab
                },
                '&.Mui-selected': {
                  color: 'blue', // Text color for selected tab
                  backgroundColor: 'white', // Background color for selected tab
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' // subtle inset shadow for active tab
                }
              }
            }}
          >
            <Tab style={{ width: '50%' }} label="Inspectors" />
            <Tab label="Cleaners" />
          </Tabs>

          <TabPanel value={selectedTab} index={0}>
            <StaffTable allStaffs={currentInspectors} />
            <TablePagination
              component="div"
              count={allInspectors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 100]}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <StaffTable allStaffs={currentCleaners} />
            <TablePagination
              component="div"
              count={allCleaners.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 100]}
            />
          </TabPanel>
        </Container>
      )}
    </Container>
  );
};

export default Users;
