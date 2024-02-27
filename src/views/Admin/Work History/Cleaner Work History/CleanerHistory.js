import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import useStaff from '../../../../Hooks/useStaff';
import useWorkHistory from '../../../../Hooks/useWorkHistory';
import Loader from 'component/Loader/Loader';
import CleanerHistoryDetails from 'component/History Details/CleanerHistoryDetails';

const CleanerHistory = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state

  const { getAllCleaners, allCleaners } = useStaff();
  const { getCleanerHistory } = useWorkHistory();
  const [cleanerHistory, setCleanerHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchAllStaffs = async () => {
      await getAllCleaners();
    };
    fetchAllStaffs();
  }, []);

  useEffect(() => {
    const fetchCleanerHistory = async () => {
      if (allCleaners.length > 0 && !isFetched) {
        setLoading(true); // Move setLoading here
        const historyPromises = allCleaners.map(cleaner => getCleanerHistory(cleaner._id));
        const histories = await Promise.all(historyPromises);
  
        const newHistory = {};
        allCleaners.forEach((cleaner, index) => {
          newHistory[cleaner._id] = histories[index];
        });
  
        setCleanerHistory(newHistory);
        setIsFetched(true);
        setLoading(false); // Ensure this is called after async operations
      }
    };
  
    fetchCleanerHistory();
    // Do not call setLoading(false) here as it would not wait for fetchCleanerHistory to complete
  }, [allCleaners]); // Depend on allCleaners to re-run this effect when they are updated

  if(loading){
    return <Loader/>
  }
  
  return (
    <Box>

      <Typography variant="h3" p={2} gutterBottom>
        Cleaner History
      </Typography>
      {allCleaners.length > 0 ? (
        allCleaners.map(cleaner => (
          <CleanerHistoryDetails key={cleaner._id} name={cleaner.username} historyData={cleanerHistory[cleaner._id]} />
        ))
      ) : (
        <Typography variant="body1">No cleaner history available.</Typography>
      )}
    </Box>
  );
};

export default CleanerHistory;
