import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import React from 'react';
import { useItemState } from 'context/ItemContext';

const ViewImage = ({ closeModal }) => {
  const { inventory } = useItemState();
  console.log('invent', inventory);
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          transformOrigin: 'top'
        }}
      >
        <span className="text-center flex justify-center items-center font-bold text-2xl pb-2">{inventory?.name}</span>
        {inventory?.image_url == 'empty' ? (
          <span className="text-center flex justify-center items-center text-red-500 font-bold text-lg pb-2">
            No Image has been uploaded for this task
          </span>
        ) : (
          <img alt="Item Uploaded" src={inventory?.image_url} className="w-72 lg:w-full h-60 object-cover" />
        )}
      </Container>
    </>
  );
};

export default ViewImage;
