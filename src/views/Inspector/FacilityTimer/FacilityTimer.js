import { ArrowForward } from '@mui/icons-material';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import useLocation from 'Hooks/useLocation';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FacilityTimer = () => {
  const { getLocation, allLocations, loading } = useLocation();
  const {
    facilities,
    getAssignedFcilities,
    assignedFacilities,
    facilitiesLoading,
    getActiveTask,
    activeLoading,
    activeTask,
    getFacilities,
    faciltiyLoading,
    facility
  } = useInspectorHook();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    getAssignedFcilities();
  }, []);
  console.log('yae', assignedFacilities);
  return (
    <div>
      <header className={`flex ${matches ? 'flex-col' : 'lg:flex-row'} justify-between items-center mb-4`}>
        <h1 className="text-3xl font-bold text-[#3366FF]">Facility Timer</h1>
        {/* Conditionally render or adjust styles for your link based on `matches` */}
      </header>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 w-full">
        
        {!faciltiyLoading &&
          assignedFacilities.length > 0 &&
          assignedFacilities?.map(location => (
            <Link
              onClick={() => {
                localStorage.setItem('locationName', `${location?.facility_id?.facility_name}- ${location?.facility_id?.city}`);
                localStorage.setItem('assignedRooms', JSON.stringify(location?.assigned_rooms));
              }}
              to={`/dashboard/facility-timers/${location?._id}`}
              key={location?._id}
              className={`bg-[#EBF0FF] px-3 py-3 flex justify-between items-center text-[#3366FF] font-bold shadow-sm`}
            >
              <span className="capitalize">{`${location?.facility_id?.facility_name}- ${location?.facility_id?.city}`}</span>
              <span>
                <ArrowForward />
              </span>
            </Link>
          ))}
      </div>
      {!faciltiyLoading && assignedFacilities.length === 0 && (
        <span className="flex justify-center items-center text-center font-bold">
          <p className="text-lg text-red-500">No Facilities assigned to you</p>
        </span>
      )}
      {faciltiyLoading && (
        <div className="flex items-center justify-center pt-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityTimer;
