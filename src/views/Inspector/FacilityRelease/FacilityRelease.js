import { ArrowForward } from '@mui/icons-material';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import useLocation from 'Hooks/useLocation';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FacilityRelease = () => {
  const {
    facilities,
    getFacilitiesForInspector,
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
    getFacilitiesForInspector();
  }, []);
  return (
    <div>
      <header className={`flex ${matches ? 'flex-col' : 'lg:flex-row'} justify-between items-center mb-4`}>
        <h1 className="text-3xl font-bold text-[#3366FF]">Facility Release</h1>
        {/* Conditionally render or adjust styles for your link based on `matches` */}
      </header>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 w-full'
      >
        {!facilitiesLoading &&
          facilities.map(location => (
            <Link
              // onClick={() => {
              //   localStorage.setItem('locationName', `${location?.city}- ${location?.country}`);
              //   localStorage.setItem('locationId', `${location?._id}`);
              // }}
              to={`/dashboard/inspector/coming-soon`}
              key={location?.id}
              className={`bg-[#EBF0FF] px-3 py-3 flex justify-between items-center text-[#3366FF] font-bold shadow-sm`}
            >
              <span>{`${location?.city}- ${location?.country}`}</span>
              <span>
                <ArrowForward />
              </span>
            </Link>
          ))}
          
      </div>
      {facilitiesLoading && (
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

export default FacilityRelease;
