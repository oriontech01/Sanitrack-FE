import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoom from 'Hooks/useRoom';
import Loader from 'component/Loader/Loader';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';

const Room = () => {
  const { getRoom, allRooms, deleteRoom, isLoading } = useRoom();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can change this value to your preference

  useEffect(() => {
    getRoom();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNavigate = () => {
    navigate('/dashboard/add-room');
  };

  const handleViewDetails = roomId => {
    navigate(`/dashboard/view-details/${roomId}`);
  };

  const handleRoomDelete = async roomId => {
    await deleteRoom(roomId);
    getRoom(); // Fetch the updated list after deletion
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Container maxWidth="lg">
        <div className="center-me">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h2" gutterBottom>
              All Rooms
            </Typography>
            <button disabled={isLoading} className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 " onClick={handleNavigate}>
              Create New Room
            </button>
          </div>

          <div style={{ marginTop: '20px' }}>
            <TableContainer>
              <Table id="taskTable">
                <TableHead>
                  <TableRow>
                    <TableCell>Room name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allRooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.roomName}</TableCell>
                      <TableCell>{`${item.location.city}, ${item.location.state} ${item.location.country}`}</TableCell>
                      <TableCell className='flex gap-x-3'>
                        <button disabled={isLoading} className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 " onClick={() => handleViewDetails(item._id)}>
                          View Details
                        </button>
                        <button disabled={isLoading} style={{backgroundColor: 'red'}}  className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 w-auto lg:h-[40px] text-base border-t-2"
                          onClick={() => handleRoomDelete(item._id)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={allRooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableContainer>
          </div>
        </div>
      </Container>
    );
  }
};

export default Room;
