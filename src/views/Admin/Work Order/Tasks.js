import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTask from '../../../Hooks/useTask';
import {
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Loader from 'component/Loader/Loader';

const Tasks = () => {
  const { getAllTasks, allTasks, deleteTask } = useTask();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true); // Start loading
      try {
        await getAllTasks(); // Wait for all tasks to be fetched
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
      setIsLoading(false); // End loading after tasks are fetched
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Paper style={{ overflowX: 'auto' }}>
              <Table size={isSmallScreen ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Room name</TableCell>
                    {isSmallScreen ? null : <TableCell>Assigned Supervisor</TableCell>}
                    <TableCell>Assigned Cleaner</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task => (
                    <TableRow key={task?._id}>
                      <TableCell>{task?.roomName.roomName}</TableCell>
                      {isSmallScreen ? null : (
                        <TableCell>
                          {`${task?.cleanerUsername[0].username?.charAt(0).toUpperCase()}${task?.cleanerUsername[0].username?.slice(1)}`}
                        </TableCell>
                      )}
                      <TableCell>
                        {`${task?.inspectorUsername[0].username?.charAt(0).toUpperCase()}${task?.inspectorUsername[0].username?.slice(1)}`}
                      </TableCell>
                      <TableCell className={`status ${task.isSubmitted ? 'done' : ''}`}>
                        {task.isSubmitted ? 'Completed' : 'Pending'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={allTasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Paper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Tasks;
