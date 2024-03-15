import React, { useEffect } from 'react';
import { Grid, Typography, Box, Divider } from '@mui/material';
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';

const ActiveTimer = () => {
  const { getActiveTimer, active, loading } = useCleanerHook();

  useEffect(() => {
    getActiveTimer();
  }, []);
  console.log('first', active);
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-4 mt-5">
        {active && !loading && active > 0
          ? active.map(timer => (
              <div className="px-2 py-2 bg-[#fff]" key={timer?._id}>
                <span className="flex justify-between">
                  <Typography variant="body2" sx={{ alignSelf: 'flex-end' }}>
                    21/2/24
                  </Typography>
                  <Typography variant="h5" color="primary" sx={{ alignSelf: 'flex-start' }}>
                    05:45:23
                  </Typography>
                </span>
                <span className="pt-2">
                  <p>Discovery Mall -Board Room</p>
                </span>
              </div>
            ))
          : !loading && (
              <span className="flex justify-center items-center">
                <p className="text-red-500 font-bold">No Active Timer Available</p>
              </span>
            )}
      </div>
      {loading && (
        <div className="flex items-center justify-center pt-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveTimer;
