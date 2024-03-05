import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, TablePagination, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import useStaff from 'Hooks/useStaff';
import StaffTable from 'component/StaffTable/StaffTable';
import Loader from 'component/Loader/Loader';
import TabPanel from 'component/Tab Panel/TabPanel';
import AddUser from './AddUser';

const Users = () => {
  const { isLoading, getAllCleaners, allCleaners, getAllInspectors, allInspectors } = useStaff();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    getAllCleaners();
    getAllInspectors();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentCleaners = allCleaners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const currentInspectors = allInspectors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AddUser isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
          <Box
            display="flex"
            flexDirection={matchesSmallScreen ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems="center"
            paddingTop={5}
            paddingBottom={5}
            textAlign={matchesSmallScreen ? 'center' : 'left'}
          >
            <Typography variant={matchesSmallScreen ? 'h4' : 'h2'}>Users</Typography>
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: 'blue' }}
              sx={{ marginTop: matchesSmallScreen ? 2 : 0 }}
            >
              Add New +
            </Button>
          </Box>

          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            centered
            sx={{
              '& .MuiTab-root': {
                flex: 1 // Ensure tabs take equal width on all screen sizes
              },
              '& .Mui-selected': {
                color: 'blue',
                backgroundColor: 'white'
              }
            }}
          >
            <Tab label="Inspectors" />
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
              rowsPerPageOptions={[5, 10, 25]}
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
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TabPanel>
        </>
      )}
    </Container>
  );
};

export default Users;
