import { useEffect, useState } from 'react';
import HistoryDetails from '../HistoryDetails/HistoryDetails';
import useRoom from '../../../Hooks/useRoom';
import useWorkHistory  from '../../../Hooks/useWorkHistory';
import './index.scss';

const RoomHistory = () => {
  const { allRooms, getRoom } = useRoom();
  const { getRoomHistory } = useWorkHistory();
  const [roomHistory, setRoomHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false); // State to track if history has been fetched

  useEffect(() => {
    getRoom();

  }, [getRoom]);

  useEffect(() => {
    const fetchRoomHistory = async () => {
      // Assuming getRoomHistory function exists and works similarly to getCleanerHistory
      const historyPromises = allRooms.map(room => getRoomHistory(room._id));
      const histories = await Promise.all(historyPromises);

      const newHistory = {};
      allRooms.forEach((room, index) => {
        newHistory[room._id] = histories[index];
      });

      setRoomHistory(newHistory);
      setIsFetched(true); // Set the flag to true after fetching
    };

    // Fetch history only if it hasn't been fetched yet
    if (allRooms.length > 0 && !isFetched) {
      fetchRoomHistory();
    }
  }, [allRooms, getRoomHistory, isFetched]); // Add isFetched to the dependency array

  return allRooms.map(room => (
    <HistoryDetails
      key={room._id}
      name={room.roomName}
      detailId={room._id}
      historyData={roomHistory[room._id]}
    />
  ));
};

export default RoomHistory;
