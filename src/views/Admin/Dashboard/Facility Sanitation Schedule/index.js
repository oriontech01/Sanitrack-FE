import React, { useEffect } from 'react';

import MonthlyMissedCleaningsChart from './BarChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  TablePagination,
  Checkbox,
  TableSortLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { useState } from 'react';
import PieChart3D from './PieChart';
import HorizonChart from './HorizontalChart';
import useTask from 'Hooks/useTask';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
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
  const { monthlyMissed, getMonthlyMissed, getMissed, missed, getTaskTable, taskTable } = useTask();
  useEffect(() => {
    getMonthlyMissed();
    getMissed();
    getTaskTable();
  }, []);
  console.log('first', taskTable);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const indexOfLastItem = (page === 0 ? 1 : page) * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = taskTable?.slice(indexOfFirstItem, indexOfLastItem);
  console.log('cuindexOfFirstItemrrent', indexOfFirstItem);
  console.log('indexOfLastItem', indexOfLastItem);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log('page', newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('asc');

  const columns = [
    { id: 1, label: 'Room' },
    { id: 2, label: 'Item' },
    { id: 3, label: 'Frequency Days' },
    { id: 4, label: 'Last Cleaned Date' },
    { id: 5, label: 'Next Due Date' },
    { id: 6, label: 'Past Due' },
    { id: 7, label: 'Assigned To ' },
    { id: 8, label: 'Item Status' },
    { id: 9, label: 'Work Order Id' },
    { id: 10, label: 'Evidence Link' }
    // Add more columns as needed
  ];
  const handleSort = columnId => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrderBy(columnId);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const sortedData = currentItems.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return b[orderBy] > a[orderBy] ? 1 : -1;
    }
  });
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Ensure two digits for day and month
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  return (
    <>
      <div className="bg-[#fff] p-5 ">
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-3 place-items-center">
          <MonthlyMissedCleaningsChart missed={monthlyMissed} />
          <PieChart3D />
          <HorizonChart missed={missed} />
        </div>

        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} sortDirection={orderBy === column.id ? order : false}>
                    <TableRow active direction={orderBy === column.id ? order : 'asc'} onClick={() => handleSort(column.id)}>
                      {column.label}
                    </TableRow>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map(room => (
                <TableRow key={room?._id}>
                  <TableCell>{room?.assigned_room?.roomName}</TableCell>
                  <TableCell>
                    <Accordion>
                      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>View Items</AccordionSummary>
                      <AccordionDetails>
                        <span className="flex flex-col gap-y-2 justify-center items-center text-center">
                          {room?.tasks?.map(item => (
                            <p key={item.name}>{item.name}</p>
                          ))}
                        </span>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                  <TableCell>{room?.times_approved}</TableCell>
                  <TableCell>{room?.tasks[-1]?.last_cleaned ? formatDate(room?.tasks[-1]?.last_cleaned) : '-'}</TableCell>
                  <TableCell>{room?.scheduled_date ? formatDate(room?.scheduled_date) : '-'}</TableCell>
                  <TableCell className={`status ${room?.isSubmitted ? 'done' : ''}`}>{room.isSubmitted ? 'No' : 'Yes'}</TableCell>
                  <TableCell>Sanitation</TableCell>
                  <TableCell className="capitalize">{room?.task_stage}</TableCell>
                  <TableCell>{room?._id}</TableCell>
                  <TableCell>
                    {' '}
                    <Accordion>
                      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>View Links</AccordionSummary>
                      <AccordionDetails>
                        <span className="flex flex-col gap-y-2 justify-center items-center text-center">
                          {room?.tasks?.map(item => (
                            <a href={item.image} key={item.name}>
                              {item.image}
                            </a>
                          ))}
                        </span>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={taskTable.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default SanitationSchedule;
