import React from 'react';

import MonthlyMissedCleaningsChart from './BarChart';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, TablePagination } from '@mui/material';
import { useState } from 'react';
const rooms = [
  {
    room: 'Living Room',
    item: 'Sofa',
    frequencyDays: 7,
    lastCleaned: '2024-02-20',
    nextDueDate: '2024-02-27',
    pastDue: false,
    assignedTo: 'Cleaning Staff A'
  },
  {
    room: 'Bedroom',
    item: 'Bed',
    frequencyDays: 14,
    lastCleaned: '2024-02-15',
    nextDueDate: '2024-03-01',
    pastDue: false,
    assignedTo: 'Cleaning Staff B'
  },
  {
    room: 'Bathroom',
    item: 'Bathtub',
    frequencyDays: 5,
    lastCleaned: '2024-02-22',
    nextDueDate: '2024-02-27',
    pastDue: true,
    assignedTo: 'Cleaning Staff C'
  }
];

console.log(rooms);

const SanitationSchedule = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="bg-[#fff] p-5 ">
        <MonthlyMissedCleaningsChart />
        <div className='mt-10'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room </TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Frequency(days)</TableCell>
              <TableCell>Last Cleaned Date</TableCell>
              <TableCell>Next Due Date</TableCell>
              <TableCell>Past Due </TableCell>
              <TableCell>Assigned To </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow key={room?.name}>
                <TableCell>{room?.name}</TableCell>
                <TableCell>{room.item}</TableCell>
                <TableCell>{room.frequencyDays}</TableCell>
                <TableCell >{room.lastCleaned}</TableCell>
                <TableCell>{room.nextDueDate}</TableCell>
                <TableCell className={`status ${room.pastDue ? 'done' : ''}`}>{room.pastDue ? 'Due' : 'Past Due'}</TableCell>
                <TableCell>{room.assignedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rooms.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
     
      </div>
    </>
  );
};

export default SanitationSchedule;
