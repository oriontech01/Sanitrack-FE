import React, { useEffect } from 'react';
import useLocation from 'Hooks/useLocation';
import { CircularProgress, TableCell, Table, TableContainer, TableBody, TableHead, TableRow, Paper, useMediaQuery, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LocationListView = () => {
  const { getLocation, allLocations, loading } = useLocation();
  const theme = useTheme();
  // Using useMediaQuery hook to listen for theme breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLocationData = async () => {
      await getLocation();
    };
    fetchLocationData();
  }, []);

  console.log('All locations loaded', allLocations);

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            {!isMobile && <TableCell align="right">Country</TableCell>}
            <TableCell align="right">State</TableCell>
            {!isMobile && <TableCell align="right">City</TableCell>}
            <TableCell align="right">Postal Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allLocations.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              {!isMobile && <TableCell align="right">{row.country}</TableCell>}
              <TableCell align="right">{row.state}</TableCell>
              {!isMobile && <TableCell align="right">{row.city}</TableCell>}
              <TableCell align="right">{row.postal_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocationListView;
