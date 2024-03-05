import axios from 'axios';
import React, { useState } from 'react';
import { Flip, toast } from 'react-toastify';

const useItems = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');
  const storedId = localStorage.getItem('roomId');

  const [responseMessage, setResponseMessage] = useState();

  const [allInventory, setAllInventory] = useState([]);
  const [inventoryLoading, setAllInventoryLoading] = useState(false);
  const [inLoading, setInLoading] = useState(false);
  const [sus, setSus] = useState(false);

  const getInventory = async () => {
    setAllInventoryLoading(true);
    await axios
      .get(`${BASE_URL}cleaning-items`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        if (response.data) {
          setAllInventoryLoading(false);
        }
        setAllInventory(response.data.data.allItems);
      })
      .catch(error => {
        if (error.response) {
          setAllInventoryLoading(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // send user back to the login page!
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const addInventory = async data => {
    setInLoading(true);
    await axios
      .post(
        `${BASE_URL}cleaning-items/add`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
     
        if (response.data) {
          window.location.reload()
          toast.success('Inventory Created Successfully', {
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
          setInLoading(false);
        }
        getInventory();
        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setInLoading(false);
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
            setResponseMessage(data.message);
            console.log('An error occured', error);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setInLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const deleteInventory = async data => {
    setInLoading(true);
    await axios
      .delete(`${BASE_URL}cleaning-items/delete`, {
        data,
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log(response);
        
        if (response.data) {
          setInLoading(false);
        
          window.location.reload()
          toast.success('Inventory Item Deleted  Successfully', {
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
        }
      })
      .catch(error => {
        if (error.response) {
          setInLoading(false);
          toast.error(error.response.data.message, {
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
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setInLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  return {
    getInventory,
    responseMessage,
    allInventory,
    inventoryLoading,
    addInventory,
    inLoading,
    deleteInventory,
    sus
  };
};

export default useItems;
