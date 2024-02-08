import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import HistoryDetails from '../../../component/History Details/HistoryDetails';
import useRoom from '../../../Hooks/useRoom';
import useWorkHistory from '../../../Hooks/useWorkHistory';
import Loader from 'component/Loader/Loader';
const RoomHistory = () => {
  const { allRooms, getRoom } = useRoom();
  const { getRoomHistory } = useWorkHistory();
  const [roomHistory, setRoomHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  useEffect(() => {
    const fetchRoomHistory = async () => {
      if (allRooms.length > 0 && !isFetched) {
        setLoading(true);
        const historyPromises = allRooms.map(room => getRoomHistory(room._id));
        const histories = await Promise.all(historyPromises);

        const newHistory = {};
        allRooms.forEach((room, index) => {
          newHistory[room._id] = histories[index];
        });

        setRoomHistory(newHistory);
        setLoading(false);
        setIsFetched(true);
      }
    };

    fetchRoomHistory();
  }, [allRooms, getRoomHistory, isFetched]);

  return (
    <Box
      sx={{
        maxHeight: '600px', // Set a max height for the Box
        overflow: 'auto' // Enable scrolling
      }}
    >
      <Typography variant="h3" p={2} gutterBottom>
        Room History
      </Typography>
      {loading ? (
        <Loader />
      ) : allRooms.length > 0 ? (
        allRooms.map(room => <HistoryDetails key={room._id} name={room.roomName} detailId={room._id} historyData={roomHistory[room._id]} />)
      ) : (
        <Typography variant="body1">No rooms available</Typography>
      )}
    </Box>
  );
};

export default RoomHistory;
