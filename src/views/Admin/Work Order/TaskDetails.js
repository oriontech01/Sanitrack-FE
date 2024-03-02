import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTask from '../../../Hooks/useTask';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Box, Paper, Grid } from '@mui/material';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [selectedCleaner, setSelectedCleaner] = useState('');
  const [selectedInspector, setSelectedInspector] = useState('');
  const { getAllCleaners, getAllInspectors, getTaskById, updateTask, allCleaners, allInspectors, singleTaskDetail } = useTask();

  useEffect(() => {
    getAllCleaners();
    getAllInspectors();
    getTaskById(taskId);
  }, [getAllCleaners, getAllInspectors, getTaskById, taskId]);

  const handleUpdate = async () => {
    try {
      const res = await updateTask(taskId, selectedCleaner, selectedInspector, singleTaskDetail.assigned_room._id);
      if (res) alert('Task updated successfully');
    } catch (error) {
      alert('Error updating Task');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '100%', overflow: 'hidden' }}>
      <Paper elevation={3} sx={{ p: 4, margin: 'auto', maxWidth: 800 }}>
        <Typography variant='h2' gutterBottom textAlign="center" color="primary">
          Task Details
        </Typography>
        <Typography variant="h4" gutterBottom>
          Room: {singleTaskDetail?.assigned_room?.roomName || 'Loading...'}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel style={{fontWeight: 'bold'}} component="legend" color="secondary">
                Select a Cleaner
              </FormLabel>
              <RadioGroup
                aria-label="cleaner"
                name="selectedCleaner"
                value={selectedCleaner}
                onChange={(event) => setSelectedCleaner(event.target.value)}
              >
                {allCleaners.map((cleaner) => (
                  <FormControlLabel key={cleaner._id} value={cleaner._id} control={<Radio />} label={cleaner.username} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel style={{fontWeight: 'bold'}} component="legend" color="secondary">
                Select an Inspector
              </FormLabel>
              <RadioGroup
                aria-label="inspector"
                name="selectedInspector"
                value={selectedInspector}
                onChange={(event) => setSelectedInspector(event.target.value)}
              >
                {allInspectors.map((inspector) => (
                  <FormControlLabel key={inspector._id} value={inspector._id} control={<Radio />} label={inspector.username} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleUpdate} disabled={!selectedCleaner || !selectedInspector}>
            Update Task
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskDetails;
