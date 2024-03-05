import React, { useState } from 'react';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  useMediaQuery,
  useTheme
} from '@mui/material';

const allFacilities = [
  {
    _id: '1',
    roomName: 'Conference Room A',
    location: { city: 'New York', state: 'NY', country: 'USA' }
  },
  {
    _id: '2',
    roomName: 'Executive Suite',
    location: { city: 'Los Angeles', state: 'CA', country: 'USA' }
  },
  {
    _id: '3',
    roomName: 'Banquet Hall',
    location: { city: 'Chicago', state: 'IL', country: 'USA' }
  },
  {
    _id: '4',
    roomName: 'Meeting Room 101',
    location: { city: 'Houston', state: 'TX', country: 'USA' }
  },
  {
    _id: '5',
    roomName: 'VIP Lounge',
    location: { city: 'Phoenix', state: 'AZ', country: 'USA' }
  }
];

const Facilities = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  // Use the useMediaQuery hook with the theme to check for the breakpoint
  // This checks if the screen size is below the small (sm) breakpoint
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = id => {
    console.log('View details: ', id);
    // Implementation for viewing details
  };

  const handleRoomDelete = id => {
    console.log('Delete room: ', id);
    // Implementation for deleting a room
  };

  return (
    <Container maxWidth="lg">
      <div
        style={{
          margin: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          gap: 10,
          flexWrap: 'nowrap',
          textAlign: 'center'
        }}
      >
        <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
          All Facilities
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: 'blue' }}
          sx={{
            // Define button size for xs screens
            fontSize: '0.6rem', // smaller text on extra-small devices
            padding: '6px 16px', // smaller padding
            // Define styles for sm screens and above
            '@media (min-width:600px)': {
              fontSize: '0.875rem', // medium text on small devices and above
              padding: '8px 24px' // medium padding
            },
            // Define styles for md screens and above
            '@media (min-width:900px)': {
              fontSize: '1rem', // larger text on medium devices and above
              padding: '10px 30px' // larger padding
            }
          }}
          onClick={() => console.log('Create New Facility')}
        >
          Create New Facility
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Facility Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFacilities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.roomName}</TableCell>
                <TableCell>{`${item.location.city}, ${item.location.state}, ${item.location.country}`}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleViewDetails(item._id)}>
                    View Details
                  </Button>
                  <Button color="secondary" onClick={() => handleRoomDelete(item._id)} style={{ marginLeft: '10px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          component="div"
          count={allFacilities.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </TableContainer>
    </Container>
  );
};

export default Facilities;
