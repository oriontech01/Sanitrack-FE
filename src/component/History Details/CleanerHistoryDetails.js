import React from 'react';
import { Modal, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material';

const CleanerHistoryDetails = ({ name, historyData }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const modalStyle = {
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 3,
    width: isXsScreen ? '90%' : '70%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: 24,
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="history-details-modal"
        aria-describedby="history-details-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={modalStyle}>
          {historyData.cleanerHistoy.map((history, index) => (
            <Box key={index} sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: index % 2 === 0 ? 'grey.100' : 'grey.200',
                }}>
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
                history.tasks.map((task, taskIndex) => (
                  <Box key={taskIndex} sx={{ mb: 2, p: 2, backgroundColor: task.isDone ? '#d9ead3' : '#f8d7da' }}>
                    <Typography variant="body1">Task Name: {task.name}</Typography>
                    <Typography variant="body1">Task Status: {task.isDone ? 'Done' : 'Pending'}</Typography>
                    {task.image !== 'empty' && (
                      <img src={task.image} alt="Task" style={{ width: '100px', height: '100px', borderRadius: '5px', marginTop: '10px' }} />
                    )}
                  </Box>
                ))
              ) : (
                <Typography variant="body1">No tasks available.</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Modal>

      <Box
        sx={{
          display: 'flex',
          margin: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'grey.100',
          p: 2,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant={isXsScreen ? 'h5' : 'h3'}>{name}</Typography>
        <Button variant="outlined" onClick={handleOpenModal}>
          View History
        </Button>
      </Box>
    </>
  );
};

export default CleanerHistoryDetails;
