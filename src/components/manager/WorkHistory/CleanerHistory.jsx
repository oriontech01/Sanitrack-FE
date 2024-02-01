

import { useEffect, useState } from 'react';
import HistoryDetails from '../HistoryDetails/HistoryDetails';
import useStaff from '../../../Hooks/useStaff';
import  useWorkHistory from '../../../Hooks/useWorkHistory';
import './index.scss'

const CleanerHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const { allStaffs, getAllStaffs } = useStaff();
  const { getCleanerHistory } = useWorkHistory();

  const [cleanerHistory, setCleanerHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false); // State to track if history has been fetched

  useEffect(() => {
    getAllStaffs(currentPage, itemsPerPage);
    console.log(`all staffs => ${JSON.stringify(allStaffs)}`)
  }, []); 

  
  useEffect(() => {
    const fetchCleanerHistory = async () => {
      const cleanerData = allStaffs.filter(staff => staff.role === 'cleaner');
      const historyPromises = cleanerData.map(cleaner => getCleanerHistory(cleaner._id));
      const histories = await Promise.all(historyPromises);

      const newHistory = {};
      cleanerData.forEach((cleaner, index) => {
        newHistory[cleaner._id] = histories[index];
      });

      setCleanerHistory(newHistory);
      setIsFetched(true); // Set the flag to true after fetching
    };

    // Fetch history only if it hasn't been fetched yet
    if (allStaffs.length > 0 && !isFetched) {
      fetchCleanerHistory();
    }
  }, [allStaffs, getCleanerHistory, isFetched]); // Add isFetched to the dependency array

  return allStaffs.map(cleaner => (
    <HistoryDetails
      key={cleaner._id}
      name={cleaner.username}
      detailId={cleaner._id}
      historyData={cleanerHistory[cleaner._id]}
    />
  ));
};

export default CleanerHistory;
