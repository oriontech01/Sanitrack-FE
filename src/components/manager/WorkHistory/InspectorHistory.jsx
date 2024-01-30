import React, { useEffect, useState } from 'react';
import HistoryDetails from '../HistoryDetails/HistoryDetails';
import useStaff from '../../../Hooks/useStaff';
import { useWorkHistory } from '../../../Hooks/useWorkHistory';

const InspectorHistory = () => {
  const { allStaffs, getAllStaffs } = useStaff();
  const { getInspectorHistory } = useWorkHistory();
  const [inspectorsHistory, setInspectorsHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false); // State to track if history has been fetched

  useEffect(() => {
    getAllStaffs();
  }, [getAllStaffs]); 

  useEffect(() => {
    const fetchInspectorHistory = async () => {
      const inspectorData = allStaffs.filter(staff => staff.role === 'inspector');
      const historyPromises = inspectorData.map(inspector => getInspectorHistory(inspector._id));
      const histories = await Promise.all(historyPromises);

      const newHistory = {};
      inspectorData.forEach((inspector, index) => {
        newHistory[inspector._id] = histories[index];
      });

      setInspectorsHistory(newHistory);
      setIsFetched(true); // Set the flag to true after fetching
    };

    // Fetch history only if it hasn't been fetched yet
    if (allStaffs.length > 0 && !isFetched) {
      fetchInspectorHistory();
    }
  }, [allStaffs, getInspectorHistory, isFetched]); // Add isFetched to the dependency array

  return allStaffs.filter(staff => staff.role === 'inspector').map(inspector => (
    <HistoryDetails
      key={inspector._id}
      name={inspector.username}
      detailId={inspector._id}
      historyData={inspectorsHistory[inspector._id]}
    />
  ));
};

export default InspectorHistory;