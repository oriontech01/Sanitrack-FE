import React, { useEffect, useState } from 'react';
import useTask from '../../Hooks/useTask';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Box, Paper } from '@mui/material';

const AddTask = () => {
  const { getUnAssignedRooms, getAllCleaners, getAllInspectors, addTask, unAssignedRooms, allCleaners, allInspectors } = useTask();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedInspector, setSelectedInspector] = useState('');

  useEffect(() => {
    getUnAssignedRooms();
    getAllCleaners();
    getAllInspectors();
  }, [getAllCleaners, getAllInspectors, getUnAssignedRooms]);

  // Custom style for scrollable RadioGroup with enhanced visibility
  const scrollableGroupStyle = {
    maxHeight: '150px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#f5f5f5' // A light grey to subtly highlight the area
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2, justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid item xs={12} md={10} lg={8}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', margin: 'auto', flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom textAlign="center" color="primary">
            Add Task
          </Typography>
          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Unassigned Rooms
            </FormLabel>
            <RadioGroup
              name="selectedRoom"
              value={selectedRoom}
              onChange={(event) => setSelectedRoom(event.target.value)}
              sx={scrollableGroupStyle}
            >
              {unAssignedRooms.map((room) => (
                <FormControlLabel key={room._id} value={room._id} control={<Radio />} label={room.roomName} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Cleaners
            </FormLabel>
            <RadioGroup
              name="selectedCleaner"
              value={selectedCleaner}
              onChange={(event) => setSelectedCleaner(event.target.value)}
              sx={scrollableGroupStyle}
            >
              {allCleaners.map((cleaner) => (
                <FormControlLabel key={cleaner._id} value={cleaner._id} control={<Radio />} label={cleaner.username} />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Inspectors
            </FormLabel>
            <RadioGroup
              name="selectedInspector"
              value={selectedInspector}
              onChange={(event) => setSelectedInspector(event.target.value)}
              sx={scrollableGroupStyle}
            >
              {allInspectors.map((inspector) => (
                <FormControlLabel key={inspector._id} value={inspector._id} control={<Radio />} label={inspector.username} />
              ))}
            </RadioGroup>
          </FormControl>

          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedRoom || !selectedCleaner || !selectedInspector}
              onClick={() => addTask(selectedRoom, selectedCleaner, selectedInspector)}
              sx={{ mt: 1, fontSize: '1rem', padding: '10px 30px' }}
            >
              Upload Task
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddTask;
