import React, { useState } from 'react';
import { Modal, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material';

const HistoryDetails = ({ name, detailId, historyData }) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Styling for the modal box adjusted for screen size
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
    <div className="work-history">
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
          {historyData && historyData.length > 0 ? (
            historyData.map((assignment, index) => (
              <Box
                key={index}
                sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: index % 2 === 0 ? 'grey.100' : 'grey.200',
                }}
              >
                {/* Repeated content omitted for brevity */}
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              No history available.
            </Typography>
          )}
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
    </div>
  );
};

export default HistoryDetails;
