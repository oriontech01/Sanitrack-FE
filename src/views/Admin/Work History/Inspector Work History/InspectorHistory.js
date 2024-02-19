import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import HistoryDetails from 'component/History Details/HistoryDetails';
import useStaff from 'Hooks/useStaff';
import useWorkHistory from '../../../../Hooks/useWorkHistory';
import Loader from 'component/Loader/Loader';

const InspectorHistory = () => {
  const { getAllInspectors, allInspectors } = useStaff();
  const { getInspectorHistory } = useWorkHistory();
  const [inspectorsHistory, setInspectorsHistory] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading as true to show spinner on mount

  useEffect(() => {
    const fetchInspectorHistory = async () => {
      // Ensure we have staff data before attempting to fetch histories
      await getAllInspectors();

      if (allInspectors.length > 0) {
        const historyPromises = allInspectors.map((inspector) => getInspectorHistory(inspector._id));
        const histories = await Promise.all(historyPromises);

        const newHistory = {};
        allInspectors.forEach((inspector, index) => {
          newHistory[inspector._id] = histories[index];
        });

        setInspectorsHistory(newHistory);
      }
      setLoading(false); // Data fetched or no data to fetch
    };

    fetchInspectorHistory();
  }, [getAllInspectors, getInspectorHistory, allInspectors]);

  // Conditionally render content within one return statement
  return (
    <Box>
      <Typography variant="h3" p={2} gutterBottom>
        Inspector History
      </Typography>
      {loading ? (
        <Loader />
      ) : allInspectors.length > 0 ? (
        allInspectors.map((inspector) => (
          <HistoryDetails
            key={inspector._id}
            name={inspector.username}
            detailId={inspector._id}
            historyData={inspectorsHistory[inspector._id]}
          />
        ))
      ) : (
        <Typography variant="body1">No inspector history available.</Typography>
      )}
    </Box>
  );
};

export default InspectorHistory;
