/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ArrowForwardIos } from '@mui/icons-material';
import { Grid, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/system';

import ModalComponent from 'component/Modals/Modal';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useItemState } from 'context/ItemContext';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import InspectorLocationModal from './InspectorLocationModal';

const InspectorLocationDetails = () => {
    const { setInventory } = useItemState();
  const { loading, roomDetails, getRoomDetailsForInspector } = useInspectorHook();
  const params = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const locationDetails = JSON.parse(localStorage.getItem('locationDeets'));
  console.log(roomDetails);

  useEffect(() => {
    if (role !== 'Inspector') {
      navigate(-1);
    }
  }, []);
  useEffect(() => {
    getRoomDetailsForInspector(params.id);
  }, []);
  console.log('first', roomDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <header className="flex lg:flex-row flex-col justify-between items-center">
        <span className="flex gap-x-2 items-center cursor-pointer" onClick={() => navigate(-1)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.6667 9.33268L12 15.9993L18.6667 22.666"
              stroke="#3366FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-2xl font-bold text-[#3366FF]">{locationDetails?.city}</h1>
        </span>
      </header>
      <div className="flex flex-col gap-y-4 bg-[#FFF7F0] p-4 w-full h-auto mt-5">
        <span className="bg-[#fff] p-2 rounded-full flex justify-center items-center w-10 h-10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
            <path
              d="M10.0004 11.8079C8.22539 11.8079 6.77539 10.3662 6.77539 8.58288C6.77539 6.79954 8.22539 5.36621 10.0004 5.36621C11.7754 5.36621 13.2254 6.80788 13.2254 8.59121C13.2254 10.3745 11.7754 11.8079 10.0004 11.8079ZM10.0004 6.61621C8.91706 6.61621 8.02539 7.49954 8.02539 8.59121C8.02539 9.68288 8.90872 10.5662 10.0004 10.5662C11.0921 10.5662 11.9754 9.68288 11.9754 8.59121C11.9754 7.49954 11.0837 6.61621 10.0004 6.61621Z"
              fill="#AF6D31"
            />
            <path
              d="M10.0004 18.967C8.76706 18.967 7.52539 18.5003 6.55872 17.5753C4.10039 15.2087 1.38372 11.4337 2.40872 6.94199C3.33372 2.86699 6.89206 1.04199 10.0004 1.04199C10.0004 1.04199 10.0004 1.04199 10.0087 1.04199C13.1171 1.04199 16.6754 2.86699 17.6004 6.95033C18.6171 11.442 15.9004 15.2087 13.4421 17.5753C12.4754 18.5003 11.2337 18.967 10.0004 18.967ZM10.0004 2.29199C7.57539 2.29199 4.45872 3.58366 3.63372 7.21699C2.73372 11.142 5.20039 14.5253 7.43372 16.667C8.87539 18.0587 11.1337 18.0587 12.5754 16.667C14.8004 14.5253 17.2671 11.142 16.3837 7.21699C15.5504 3.58366 12.4254 2.29199 10.0004 2.29199Z"
              fill="#AF6D31"
            />
          </svg>
        </span>
        <p className="text-lg">Work Order Address</p>
        <p className="text-xl font-bold text-[#AF6D31]">{`${locationDetails?.city}-${locationDetails?.country}`}</p>
      </div>

      <Box sx={{ width: '100%' }} className="relative">
        <h2 className="capitalize text-3xl font-medium text-blue-500 pt-5"> Facility Details</h2>
        <div className="">
          <Grid container spacing={2}>
            {roomDetails &&
              !loading &&
              (roomDetails.length > 0 ? (
                roomDetails.map((room, index) => (
                  <div
                    className="w-full mt-5"
                    key={room.roomId}
                    onClick={() => {
                      localStorage.setItem('roomId', room?.roomId);
                      localStorage.setItem('taskId', room?.taskId);
                      openModal();
                      setInventory(room?.taskId)
                    }}
                  >
                    <Grid item xs={12} sm={6} className='cursor-pointer'>
                      <ListItem style={{ backgroundColor: '#EBF0FF', borderRadius: 10 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <ListItemText
                            primary={room?.roomName}
                            primaryTypographyProps={{ fontWeight: 'bold', color: 'blue' }}
                            // secondary={location?.state}
                            secondaryTypographyProps={{ color: 'blue' }}
                          />
                        </Box>
                        <ArrowForwardIos />
                      </ListItem>
                    </Grid>
                  </div>
                ))
              ) : (
                <span className="flex justify-center items-center my-4 w-full">
                  <p className="text-black text-lg font-medium">No locations available </p>
                </span>
              ))}
          </Grid>
          {loading && (
            <div className="flex items-center justify-center pt-5">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </Box>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        <InspectorLocationModal closeModal={closeModal} />
      </ModalComponent>
    </>
  );
};

export default InspectorLocationDetails;
