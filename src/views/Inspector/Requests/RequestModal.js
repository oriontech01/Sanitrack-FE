import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { useItemState } from 'context/ItemContext';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useParams } from 'react-router';

const RequestModal = ({ closeModal }) => {
  const params = useParams();
  const { inventory } = useItemState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  const access_token = localStorage.getItem('auth-token');
  console.log(inventory);
  const [quantity, setQuantity] = useState('');
  const [comment, setComment] = useState('');

  const approveCleaningItems = async data => {
    setItemsLoading(true);
    await axios
      .put(
        `${BASE_URL}inspector/approve-cleaning-items?taskId=${params.id}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          toast.success('Cleaning Item Approved Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setItemsLoading(false);
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemsLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
           
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemsLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const rejectCleaningItems = async data => {
    setItemLoading(true);
    await axios
      .put(
        `${BASE_URL}inspector/decline?taskId=${params.id}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          toast.warn('Cleaning Item Rejected ', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setItemLoading(false);
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
           
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      inspectorAcceptData: {
        cleaning_id: inventory.cleaning_id,
        request_id: inventory._id,
        inspector_comment: comment,
        item_name: inventory.item_name,
        quantity: quantity,
        unit: inventory.unit
      }
    };
    approveCleaningItems(data);
    console.log('first', data);
  };
  const handleReject = e => {
    e.preventDefault();
    const data = {
      inspectorAcceptData: {
        cleaning_id: inventory.cleaning_id,
        request_id: inventory._id,
        inspector_comment: comment,
        item_name: inventory.item_name,
        quantity: quantity,
        unit: inventory.unit
      }
    };
    rejectCleaningItems(data);
  };
  return (
    <>
      <header className="flex flex-row justify-between items-center px-4 pt-2">
        <h1 className="text-lg font-bold text-[#3366FF]">Item Details</h1>
        <span className="flex gap-x-2 items-center cursor-pointer">
          <svg className="fill-blue-500 w-5 h-5" onClick={closeModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
          </svg>
        </span>
      </header>
      <main className="mt-5 lg: mx-2 mx-4">
        <div className=" flex justify-between items-center border-b border-gray-500 pb-3 text-lg">
          <span>{inventory?.item_name}</span>
          <span>{inventory?.cleaner_reason}</span>
        </div>
        <div className=" flex flex-col gap-y-2    mt-4 text-lg">
          <span className="text-lg font-bold text-blue-500">Cleaner Comment</span>
          <span>{inventory?.quantity}</span>
        </div>
      </main>

      <Container
        maxWidth="xl"
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          transformOrigin: 'top'
        }}
      >
        <form>
          <div className="pb-2 w-full">
            <p className="text-gray-400 pb-2 font-medium text-sm">Enter Comment Here</p>
            <input
              type="text"
              id="comment"
              onChange={e => setComment(e.target.value)}
              name="comment"
              required
              placeholder="Enter Comment"
              className="border-2 p-2 outline-none border-blue-400 text-[#999999] h-12 bg-blue-100 rounded-md w-72 lg:w-full"
            />
          </div>
          <div className="pb-2 w-full">
            <p className="text-gray-400 pb-2 font-medium text-sm">Enter Quantity Here</p>
            <input
              type="number"
              id="quan"
              required
              onChange={e => setQuantity(e.target.value)}
              name="quan"
              placeholder="Enter Quantity"
              className="border-2 p-2 outline-none border-blue-400 text-[#999999] h-12 bg-blue-100 rounded-md w-72 lg:w-full"
            />
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse w-full">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 ">
              <button
                disabled={itemLoading}
                onClick={handleReject}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-200 text-base leading-6 font-medium text-red-600 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {itemLoading ? 'Loading...' : 'Reject'}
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 ">
              <button
                disabled={itemsLoading}
                onClick={handleSubmit}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-blue-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {itemsLoading ? 'Loading...' : 'Approve'}
              </button>
            </span>
          </div>
        </form>
      </Container>
    </>
  );
};

export default RequestModal;
