import React, { useEffect } from 'react';
import useLocation from 'Hooks/useLocation';
import { CircularProgress, TableCell, Table, TableContainer, TableBody, TableHead,TableRow, Paper } from '@mui/material';

const LocationListView = () => {
  const { getLocation, allLocations, loading } = useLocation();

  useEffect(() => {
    const fetchLocationData = async () => {
      await getLocation();
    };
    fetchLocationData();
  }, []);

  console.log('All locations loaded', allLocations);

  if (loading) return <CircularProgress style={{ margin: '0 auto' }} />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Postal Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allLocations.map(row => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.postal_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocationListView;
