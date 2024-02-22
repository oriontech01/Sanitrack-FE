import { useEffect, useState } from 'react';
import useEvidence from 'Hooks/useEvidence';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Loader from 'component/Loader/Loader';

const Evidence = () => {
  const navigate = useNavigate();
  const { getRoom, allRooms } = useEvidence();
  const [loading, setLoading] = useState(false);

  const handleViewImages = (taskId) => {
    navigate(`/dashboard/evidence/view/${taskId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getRoom();
      setLoading(false); // Move setLoading(false) here
    };
  
    fetchData();
  }, []); // Dependency array to re-run the effect if getRoom changes
  

  return loading ? (
    <Loader />
  ) : (
    <div className="tab-display">
      <div className="center-me">
        <div className="container">
          <TableContainer component={Paper}>
            <Table id="taskTable">
              <TableHead>
                <TableRow>
                  <TableCell>Room name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRooms ? (
                  allRooms.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.roomName}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleViewImages(item.task_id);
                          }}
                        >
                          View Images
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No rooms available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Evidence;
