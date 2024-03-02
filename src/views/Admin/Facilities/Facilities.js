import React, { useEffect, useState } from 'react';
import Loader from 'component/Loader/Loader';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';

const allFacilities = [
    {
      _id: '1',
      roomName: 'Conference Room A',
      location: {
        city: 'New York',
        state: 'NY',
        country: 'USA'
      }
    },
    {
      _id: '2',
      roomName: 'Executive Suite',
      location: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    },
    {
      _id: '3',
      roomName: 'Banquet Hall',
      location: {
        city: 'Chicago',
        state: 'IL',
        country: 'USA'
      }
    },
    {
      _id: '4',
      roomName: 'Meeting Room 101',
      location: {
        city: 'Houston',
        state: 'TX',
        country: 'USA'
      }
    },
    {
      _id: '5',
      roomName: 'VIP Lounge',
      location: {
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA'
      }
    }
  ];
const Facilities = () => {
    return (
      <Container maxWidth="lg">
        <div className="center-me">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h2" gutterBottom>
              All Facilities
            </Typography>
            <button  className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 ">
              Create New Facility
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <TableContainer>
              <Table id="taskTable">
                <TableHead>
                  <TableRow>
                    <TableCell>Facility Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFacilities.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.roomName}</TableCell>
                      <TableCell>{`${item.location.city}, ${item.location.state} ${item.location.country}`}</TableCell>
                      <TableCell className='flex gap-x-3'>
                        <button  className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 " onClick={() => handleViewDetails(item._id)}>
                          View Details
                        </button>
                        <button style={{backgroundColor: 'red'}}  className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 w-auto lg:h-[40px] text-base border-t-2"
                          onClick={() => handleRoomDelete(item._id)}
                        >
                          Delete
                        </button>
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
          </div>
        </div>
      </Container>
    );
  }

export default Facilities;
