import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import useRoom from '../../../../Hooks/useRoom';
import useWorkHistory from '../../../../Hooks/useWorkHistory';
import Loader from 'component/Loader/Loader';
// import RoomHistoryDetails from 'component/History Details/RoomHistoryDetails';
import HistoryDetails from 'component/History Details/HistoryDetails';
const RoomHistory = () => {
  const { allRooms, getRoom,isLoading } = useRoom();
  const { getRoomHistory } = useWorkHistory();
  const [roomHistory, setRoomHistory] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    getRoom();
  }, []);

  useEffect(() => {
    const fetchRoomHistory = async () => {
      if (allRooms.length > 0 && !isFetched) {
      
        const historyPromises = allRooms.map(room => getRoomHistory(room._id));
        const histories = await Promise.all(historyPromises);

        const newHistory = {};
        allRooms.forEach((room, index) => {
          newHistory[room._id] = histories[index];
        });

        setRoomHistory(newHistory);
       
        setIsFetched(true);
      }
    };

    fetchRoomHistory();
  }, []);

  console.log("History Data,", roomHistory)
  return (
    <Box
      sx={{
        maxHeight: '600px', // Set a max height for the Box
        overflow: 'auto' // Enable scrolling
      }}
    >
      
    
      <h2 className="capitalize text-2xl font-bold text-blue-500 capitalize">  Room History</h2>
    
      {isLoading && (
       <div className="flex items-center justify-center pt-5">
       <div className="relative">
         <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-gray-200"></div>
         <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
       </div>
     </div>
      )}
      {(allRooms && !isLoading) &&
        (allRooms.length > 0 ? (
          allRooms.map(room => {
            return <HistoryDetails key={room._id} name={room.roomName} detailId={room._id} historyData={roomHistory[room._id]} />;
          })
        ) : (
          <Typography variant="body1">No rooms available</Typography>
        ))}
    </Box>
  );
};

export default RoomHistory;
