import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import HistoryDetails from '../../../component/History Details/HistoryDetails';
import useStaff from '../../../Hooks/useStaff';
import useWorkHistory from '../../../Hooks/useWorkHistory';
import Loader from 'component/Loader/Loader';

const CleanerHistory = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state

  const { getAllCleaners, allCleaners } = useStaff();
  const { getCleanerHistory } = useWorkHistory();
  const [cleanerHistory, setCleanerHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchAllStaffs = async () => {
      await getAllCleaners()
    };
    fetchAllStaffs();
  }, [getAllCleaners]);

  useEffect(() => {
    const fetchCleanerHistory = async () => {
      if (allCleaners.length > 0 && !isFetched) {
        const historyPromises = allCleaners.map(cleaner => getCleanerHistory(cleaner._id));
        const histories = await Promise.all(historyPromises);

        const newHistory = {};
        allCleaners.forEach((cleaner, index) => {
          newHistory[cleaner._id] = histories[index];
        });

        setCleanerHistory(newHistory);
        setIsFetched(true);
        setLoading(false); // Data fetched  
      }
    };

    fetchCleanerHistory();
  }, [allCleaners, getCleanerHistory, isFetched]);

  return (
    <Box>
      <Typography variant="h3" p={2} gutterBottom>
        Cleaner History
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        allCleaners.length > 0 ? (
          allCleaners.map(cleaner => (
            <HistoryDetails
              key={cleaner._id}
              name={cleaner.username}
              detailId={cleaner._id}
              historyData={cleanerHistory[cleaner._id]}
            />
          ))
        ) : (
          <Typography variant="body1">No cleaner history available.</Typography>
        )
      )}
    </Box>
  );
};

export default CleanerHistory;
