/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Grid, ListItem, ListItemText } from '@mui/material';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import ModalComponent from 'component/Modals/Modal';
import { useItemState } from 'context/ItemContext';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import RequestModal from './RequestModal';
import { ToastContainer } from 'react-toastify';

const RequestDetails = () => {
    const { setInventory } = useItemState();
  const params = useParams();
  const navigate = useNavigate();
  const { getSingleRequestedCleaningItems, requestedSingleItems, loading } = useInspectorHook();
  console.log(params);

  useEffect(()=>{
getSingleRequestedCleaningItems(params.id)
  },[])
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <ToastContainer/>
      {' '}
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

          <h1 className="text-2xl font-bold text-[#3366FF]">Request Details</h1>
        </span>
        
      </header>
      {requestedSingleItems?.length > 0 && <p className="text-sm text-gray-400 p-4">Items to Clean :{requestedSingleItems?.length}</p>}
        <Grid container spacing={2}>
            {requestedSingleItems &&
              !loading &&
              (requestedSingleItems.length > 0 ? (
                requestedSingleItems.map((room, index) => (
                  <div
                    className="w-full mt-5"
                    key={room.roomId}
                    onClick={() => {
                      localStorage.setItem('roomId', params?.id);
                      localStorage.setItem('requestId', room?._id);
                      openModal();
                      setInventory(room)
                    }}
                  >
                    <Grid item xs={12} sm={6} className='cursor-pointer'>
                      <ListItem style={{ backgroundColor: '#EBF0FF', borderRadius: 10 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <ListItemText
                            primary={room?.item_name}
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
                  <p className="text-black text-lg font-medium">No Items available </p>
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
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        <RequestModal closeModal={closeModal} />
      </ModalComponent>
    </>
  );
};

export default RequestDetails;
