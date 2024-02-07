import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTask from '../../Hooks/useTask';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Tasks = () => {
  const { getAllTasks, allTasks, deleteTask } = useTask();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigate = () => {
    navigate('/dashboard/add-task');
  };

  const handleTaskDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleTaskEdit = (taskId) => {
    navigate(`/dashboard/edit-task/${taskId}`);
  };

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Tasks
            </Typography>
            <Button variant="contained" style={{ marginBottom: theme.spacing(2) }} color="primary" onClick={handleNavigate}>
              Create New Task
            </Button>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Room name</TableCell>
                    <TableCell>Assigned Supervisor</TableCell>
                    <TableCell>Assigned Cleaner</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allTasks.map((task) => (
                    <TableRow key={task._id}>
                      <TableCell>{task.roomName.roomName}</TableCell>
                      <TableCell>
                        {`${task.cleanerUsername.username.charAt(0).toUpperCase()}${task.cleanerUsername.username.slice(1)}`}
                      </TableCell>
                      <TableCell>
                        {`${task.inspectorUsername.username.charAt(0).toUpperCase()}${task.inspectorUsername.username.slice(1)}`}
                      </TableCell>
                      <TableCell className={`status ${task.isSubmitted ? 'done' : ''}`}>
                        {task.isSubmitted ? 'Completed' : 'Pending'}
                      </TableCell>
                      <TableCell>
                        <Button color="primary" onClick={() => handleTaskEdit(task.taskId)}>
                          Edit
                        </Button>
                        <Button color="secondary" onClick={() => handleTaskDelete(task._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Tasks;
