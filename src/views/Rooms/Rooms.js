import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoom from '../../Hooks/useRoom';
import Loader from 'component/Loader/Loader';
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Room = () => {
  const { getRoom, allRooms, deleteRoom, isLoading } = useRoom();
  const navigate = useNavigate();

  useEffect(() => {
    getRoom();
  }, []);

  const handleNavigate = () => {
    navigate('/dashboard/add-room');
  };

  const handleViewDetails = roomId => {
    navigate(`/dashboard/view-details/${roomId}`);
  };

  const handleRoomDelete = async roomId => {
    await deleteRoom(roomId);
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
            <Button variant="contained" color="primary" onClick={handleNavigate}>
              Create New Room
            </Button>
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
                  {allRooms && allRooms.length > 0 ? (
                    allRooms.map(item => (
                      <TableRow key={item._id}>
                        <TableCell>{item.roomName}</TableCell>
                        <TableCell>{`${item.location.city}, ${item.location.state} ${item.location.country}`}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" className="view-btn" onClick={() => handleViewDetails(item._id)}>
                            View Details
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ margin: '10px' }}
                            className="delete-btn"
                            onClick={() => handleRoomDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No rooms available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    );
  }
};

export default Room;
