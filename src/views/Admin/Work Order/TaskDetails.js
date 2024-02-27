import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTask from '../../../Hooks/useTask';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Box } from '@mui/material';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedInspector, setSelectedInspector] = useState('');
  const { getAllCleaners, getAllInspectors, getTaskById, updateTask, allCleaners, allInspectors, singleTaskDetail } = useTask();

  useEffect(() => {
    const fetchAllCleaners = async () => {
      await getAllCleaners();
    };
    const fetchAllInspectors = async () => {
      await getAllInspectors();
    };
    const fetchSingleTask = async () => {
      await getTaskById(taskId);
    };

    fetchAllCleaners();
    fetchAllInspectors();
    fetchSingleTask();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await updateTask(taskId, selectedCleaner, selectedInspector, singleTaskDetail.assigned_room._id);
      if (res) alert('Task updated successfully');
    } catch (error) {
      alert('Error updating Task');
      return;
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20px'
      }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h2" gutterBottom textAlign="center">
          Task Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Room: {singleTaskDetail?.assigned_room?.roomName}
        </Typography>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Cleaners</FormLabel>
          <RadioGroup
            name="selectedCleaner"
            value={selectedCleaner}
            onChange={event => setSelectedCleaner(event.target.value)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {allCleaners.map(cleaner => (
              <FormControlLabel
                key={cleaner._id}
                value={cleaner._id}
                control={<Radio />}
                label={cleaner.username}
                sx={{ flexDirection: 'row' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Inspectors</FormLabel>
          <RadioGroup
            name="selectedInspector"
            value={selectedInspector}
            onChange={event => setSelectedInspector(event.target.value)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {allInspectors.map(inspector => (
              <FormControlLabel
                key={inspector._id}
                value={inspector._id}
                control={<Radio />}
                label={inspector.username}
                sx={{ flexDirection: 'row' }}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box textAlign="center" marginTop={2}>
          <Button
            variant="contained"
            color="primary"
            // disabled={!selectedCleaner || !selectedInspector || singleTaskDetail.isSubmitted}
            onClick={handleUpdate}
            disabled={!selectedCleaner || !selectedInspector}
          >
            Update
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default TaskDetails;
