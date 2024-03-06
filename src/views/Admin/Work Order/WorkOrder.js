import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import useLocation from '../../../Hooks/useLocation';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import TabPanel from 'component/Tab Panel/TabPanel';
import Tasks from './Tasks';
import ArrowForward from '@mui/icons-material/ArrowForward';

const WorkOrder = () => {
  const { getLocation, allLocations, loading } = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <header className={`flex ${matches ? 'flex-col' : 'lg:flex-row'} justify-between items-center mb-4`}>
        <h1 className="text-3xl font-bold text-[#3366FF]">Work Schedule</h1>
        {/* Conditionally render or adjust styles for your link based on `matches` */}
      </header>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Work order and tasks tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="Work Orders" />
          <Tab label="Tasks List" />
        </Tabs>
      </Box>

      <main>
        <TabPanel value={selectedTab} index={0}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: 5, gap: 2 }}>
              {!loading &&
                allLocations.map(location => (
                  <Link
                    onClick={() => {
                      localStorage.setItem('locationName', `${location?.city}- ${location?.country}`);
                      localStorage.setItem('locationId', `${location?._id}`);
                    }}
                    to={`/dashboard/work-order/${location?._id}`}
                    key={location?._id}
                    className={`bg-[#EBF0FF] px-3 py-3 flex justify-between items-center ${matches ? 'w-full' : 'w-1/2'} text-[#3366FF] font-bold shadow-sm`}
                  >
                    <span>{`${location?.city}- ${location?.country}`}</span>
                    <span><ArrowForward/></span>
                  </Link>
                ))}
          </Box>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <Tasks />
        </TabPanel>
        {loading && (
          <div className="loader">
            {/* Loader content */}
          </div>
        )}
      </main>
    </>
  );
};

export default WorkOrder;
