import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTask from '../../../Hooks/useTask';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Loader from 'component/Loader/Loader';

const Tasks = () => {
  const { getAllTasks, allTasks, deleteTask } = useTask();
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    const fetchTasks = async () => {
      setIsLoading(true); // Start loading
      try {
        await getAllTasks(); // Wait for all tasks to be fetched
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        // Handle any errors here, such as displaying an error message to the user
      }
      setIsLoading(false); // End loading after tasks are fetched
    };
  
    fetchTasks();
  }, []);
  
  if(isLoading){
    return <Loader/>
  }
console.log("ALL TASKS-----------------", allTasks)
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Tasks
          </Typography>
          <button className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-blue-700 w-auto lg:h-[40px] text-base border-t-2 " onClick={handleNavigate}>
            Create New Task
          </button>
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
                {allTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                  <TableRow key={task?._id}>
                    <TableCell>{task?.roomName.roomName}</TableCell>
                    <TableCell>
                      {`${task?.cleanerUsername?.username?.charAt(0).toUpperCase()}${task?.cleanerUsername?.username?.slice(1)}`}
                    </TableCell>
                    <TableCell>
                      {`${task?.inspectorUsername?.username?.charAt(0).toUpperCase()}${task?.inspectorUsername?.username?.slice(1)}`}
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={allTasks.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  );
};

export default Tasks;
