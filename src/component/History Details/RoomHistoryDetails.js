import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const RoomHistoryDetails = ({ name, roomHistory }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  console.log('HISTORYYYYYYY', roomHistory.assigned_room)
  return (
    <div className="work-history">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="history-details-modal"
        aria-describedby="history-details-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            width: '70vw', // Adjust width as needed
            maxHeight: '80vh', // Limit maximum height for scrollability
            overflowY: 'auto' // Enable vertical scrolling when content exceeds maximum height
          }}
        >
          {roomHistory ? (
            <div className="assignment" style={{ marginBottom: '30px', padding: '10px', backgroundColor: '#f3f3f3' }}>
              <Typography variant="h5" className="room-name">
                Room: {roomHistory.rommHistory.assigned_room.roomName}
              </Typography>
              <Typography variant="body1" className="detail-id">
                Detail ID: {roomHistory._id}
              </Typography>
              <Typography variant="body1" className="status" style={{ color: roomHistory.isSubmitted ? '#28a745' : '#dc3545' }}>
                Status: {roomHistory.isSubmitted ? 'Submitted' : 'Not Submitted'}
              </Typography>
              <Typography variant="h6" className="tasks-heading">
                Tasks:
              </Typography>
              {roomHistory.tasks && roomHistory.tasks.length > 0 ? (
                roomHistory.tasks.map((task, taskIndex) => (
                  <Box key={taskIndex} className="task" style={{ padding: '10px', backgroundColor: task.isDone ? '#d9ead3' : '#f8d7da' }}>
                    <Typography variant="body1" className="task-name" style={{ color: task.isDone ? '#155724' : '#721c24' }}>
                      Task Name: {task.name}
                    </Typography>
                    <Typography variant="body1" className="task-status" style={{ color: task.isDone ? '#155724' : '#721c24' }}>
                      Task Status: {task.isDone ? 'Done' : 'Pending'}
                    </Typography>
                    {task.image !== 'empty' && (
                      <img
                        src={task.image}
                        alt={task.name}
                        className="task-image"
                        style={{ width: '100px', height: '100px', borderRadius: '5px', marginTop: '10px' }}
                      />
                    )}
                  </Box>
                ))
              ) : (
                <Typography variant="body1" className="no-tasks">
                  No tasks available.
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="body1" className="no-history">
              No history available.
            </Typography>
          )}
        </Box>
      </Modal>

      <Box
        display="flex"
        margin={5}
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#f3f3f3" // Set background color
        padding={2} // Add padding for better spacing
        borderRadius={5} // Add border radius for rounded corners
        boxShadow={3} // Add a subtle shadow for depth
      >
        <Typography variant="h3">{name}</Typography>
        <Button variant="outlined" onClick={handleOpenModal}>
          View History
        </Button>
      </Box>
    </div>
  );
};

export default RoomHistoryDetails;
