/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import useLocation from '../../../Hooks/useLocation';
import { Link } from 'react-router-dom';
import { Tabs, Tab, Box, useMediaQuery, useTheme } from '@mui/material';
import TabPanel from 'component/Tab Panel/TabPanel';
import Tasks from './Tasks';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ModalComponent from 'component/Modals/Modal';
import SelectWorkOrderType from './SelectWorkOrderType';
import AssignedFacilities from './AssignedFacilities';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <header className={`flex ${matches ? 'flex-col' : 'lg:flex-row'} justify-between items-center mb-4`}>
        <h1 className="text-3xl font-bold text-[#3366FF]">Work Schedule</h1>
        {/* Conditionally render or adjust styles for your link based on `matches` */}
      </header>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Work order and tasks tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Work Orders" />
          <Tab label="Tasks List" />
          <Tab label="Assigned Facility Timers" />
        </Tabs>
      </Box>

      <main>
        <TabPanel value={selectedTab} index={0}>
          <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'
          >
            {!loading &&
              allLocations.map(location => (
                <span
                  onClick={() => {
                    localStorage.setItem('locationName', `${location?.city}- ${location?.facility_name} `);
                    localStorage.setItem('locationId', `${location?._id}`);
                    openModal();
                  }}

                  // to={`/dashboard/work-order/${location?._id}`}
                  key={location?._id}
                  className={`bg-[#EBF0FF] px-3 py-3 flex justify-between items-center w-full text-[#3366FF] font-bold shadow-sm cursor-pointer`}
                >
                  <div className='flex flex-col gap-y-2'>
                  <span>{`${location?.city}- ${location?.country}`}</span>
                  <span className='font-normal'>{location?.facility_name}</span>
                  </div>
                
                  <span>
                    <ArrowForward />
                  </span>
                </span>
              ))}
          </div>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <Tasks />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <AssignedFacilities />
        </TabPanel>
        {loading && (
          <div className="flex items-center justify-center pt-5">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}
      </main>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        <SelectWorkOrderType closeModal={closeModal} />
      </ModalComponent>
    </>
  );
};

export default WorkOrder;
