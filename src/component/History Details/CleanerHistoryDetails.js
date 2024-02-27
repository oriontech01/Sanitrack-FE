import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

const CleanerHistoryDetails = ({ name, historyData }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
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
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="history-details-modal"
        aria-describedby="history-details-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            width: '70vw',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          {historyData.cleanerHistoy.map(history => (
            <Box key={history._id} sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Room: {history.assigned_room.roomName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Date Added: {new Date(history.date_added).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: history.isSubmitted ? 'green' : 'red' }}>
                Status: {history.isSubmitted ? 'Submitted' : 'Not Submitted'}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tasks:
              </Typography>
              {history.tasks.length > 0 ? (
                history.tasks.map(task => (
                  <Box key={task._id} sx={{ mb: 2, p: 2, backgroundColor: task.isDone ? '#d9ead3' : '#f8d7da' }}>
                    <Typography variant="body1">Task Name: {task.name}</Typography>
                    <Typography variant="body1">Task Status: {task.isDone ? 'Done' : 'Pending'}</Typography>
                    {task.image !== 'empty' && (
                      <img
                        src={task.image}
                        alt="Task"
                        style={{ width: '100px', height: '100px', borderRadius: '5px', marginTop: '10px' }}
                      />
                    )}
                  </Box>
                ))
              ) : (
                <Typography variant='h2' color={'black'}>No tasks available.</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default CleanerHistoryDetails;
