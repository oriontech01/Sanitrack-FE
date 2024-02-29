import React, { useState } from 'react';
import { Box, Button, Container, FormControl, Grid, Input, InputLabel, OutlinedInput, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { toast, Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useItems from 'Hooks/useItems';

const AddInventory = ({closeModal}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({});
  const [pairs, setPairs] = useState(false);
  const [imgurl, setImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');
  let url = 'rrr';
  const { addInventory, inLoading,sus } = useItems();
  const handleImageChange = async e => {
    e.preventDefault();

    const file = e.target.files[0];
    setImage(file);

    // Create a temporary URL for image preview
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
    console.log('klll', file);
    const formData = new FormData();
    formData.append('form', file);
    console.log('klll', formData);
    // try {
    //   const response = await axios.post(
    //     `${BASE_URL}documents/upload`,

    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${access_token}`
    //       }
    //     }
    //   );

    //   // const imageData = await response?.data?.image;
    //   console.log('first', response);
    //   // setImgUrl(imageData);
    //   // if (response?.data?.image) {
    //   //   setImage(file);
    //   // }
    // } catch (error) {
    //   if (error) {
    //     console.log(error);
    //     setImage('');
    //     toast.error(error?.message, {
    //       position: 'top-center',
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: 'colored',
    //       transition: Flip
    //     });
    //   }
    // }
  };

  const handleValueChange = event => {
    setSelectedValue(event.target.value);
  };
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log('this is data...', data);
  };
  const handleSubmit = e => {
    e.preventDefault();

    const newData = { ...data, pairs: pairs, image: image };
    console.log('first', newData);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('pairs', pairs);
    formData.append('name',data.name)
    formData.append('unit',data.unit)
    formData.append('type',data.type)
    formData.append('quantity',data.quantity)
    formData.append('description',data.description)
    addInventory(formData);
    if(sus){
      closeModal()
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="p-6">
        <Typography variant="h3" component="h2" gutterBottom>
          Add Inventory Item
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel variant="h2">Name:</InputLabel>
                  <Input placeholder="Name" onChange={handleChange} name="name" variant="outlined" />
                </FormControl>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel variant="h2">Quantity:</InputLabel>
                  <Input placeholder="100" onChange={handleChange} name="quantity" type="number" variant="outlined" />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item lg={6} sm={6} xs={12}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel variant="h2">Type:</InputLabel>
                  <Input placeholder="consumable" onChange={handleChange} name="type" type="text" variant="outlined" />
                </FormControl>
              </Box>
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              <div className="flex items-center space-x-3 py-6">
                <input
                  type="checkbox"
                  className="border-gray-300 rounded h-5 w-5"
                  onChange={e => setPairs(e.target.checked)}
                  name="pairs"
                />

                <div className="flex flex-col">
                  <h1 className="text-gray-700 font-medium leading-none">Pairs</h1>
                </div>
              </div>
            </Grid>
          </Grid>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel variant="h2">Unit:</InputLabel>
              <Input placeholder="unit" onChange={handleChange} name="unit" type="text" variant="outlined" />
            </FormControl>
          </Box>
          {/* <div className="flex items-center justify-between max-md:flex-col gap-3 w-full">
            <div className="flex items-center space-x-3 py-3">
              <input
                type="radio"
                value="kilos"
                checked={selectedValue === 'kilos'}
                onChange={handleValueChange}
                className="border-gray-300 rounded h-5 w-5"
              />

              <div className="flex flex-col">
                <h1 className="text-gray-700 font-medium leading-none">Kilograms</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3 py-3">
              <input
                type="radio"
                value="litres"
                checked={selectedValue === 'liters'}
                onChange={handleValueChange}
                className="border-gray-300 rounded h-5 w-5"
              />

              <div className="flex flex-col">
                <h1 className="text-gray-700 font-medium leading-none">Litres</h1>
              </div>
            </div>
          </div> */}
          {/* {selectedValue === 'kilos' && (
            <Box sx={{ mb: 2 }}>
              <TextField fullWidth label="Value in Kilos" variant="outlined" value="" />
            </Box>
          )}
          {selectedValue === 'litres' && (
            <Box sx={{ mb: 2 }}>
              <TextField fullWidth label="Value in Litres" variant="outlined" value="" />
            </Box>
          )} */}
          {imagePreview && (
            <Box sx={{ mb: 2 }}>
              <div className="relative">
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute cursor-pointer top-1 rounded-full right-1 bg-[#fff] p-1.5 flex items-center justify-center"
                >
                  <IoClose />
                </button>
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
              </div>
            </Box>
          )}
          {!imagePreview && (
            <Box sx={{ mb: 2 }}>
              <label htmlFor="profile-image-input">
                <p className="text-sm">Image</p>
                <div className="lg:w-full h-40 relative">
                  <input
                    className="w-full h-40 hidden     p-2 bg-lmsGray rounded-md border border-[#E1E1E1]  text-[#ACACAC] "
                    type="file"
                    id="profile-image-input"
                    onChange={e => handleImageChange(e)}
                  />
                  <div className="cursor-pointer lg:w-full h-40 flex items-center justify-center border-dashed mt-3 border-2 rounded-lg border-lmsBlack bg-[#F8F8F8]">
                    <span className=" w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center">
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22.6582 3.65967C22.6582 3.39445 22.5528 3.1401 22.3653 2.95256C22.1778 2.76502 21.9234 2.65967 21.6582 2.65967H3.6582C3.39299 2.65967 3.13863 2.76502 2.9511 2.95256C2.76356 3.1401 2.6582 3.39445 2.6582 3.65967V21.6597C2.6582 21.9249 2.76356 22.1792 2.9511 22.3668C3.13863 22.5543 3.39299 22.6597 3.6582 22.6597H21.6582C21.9234 22.6597 22.1778 22.5543 22.3653 22.3668C22.5528 22.1792 22.6582 21.9249 22.6582 21.6597V3.65967ZM20.6582 20.6597H4.6582V18.1407L8.5842 14.9997L10.9512 17.3667C11.1387 17.5541 11.393 17.6595 11.6582 17.6595C11.9234 17.6595 12.1777 17.5541 12.3652 17.3667L16.7322 12.9997L20.6582 16.1407V20.6597ZM20.6582 13.5787L17.2832 10.8787C17.091 10.7249 16.8488 10.6474 16.6031 10.6611C16.3573 10.6747 16.1252 10.7786 15.9512 10.9527L11.6582 15.2457L9.3652 12.9527C9.19121 12.7786 8.95911 12.6747 8.71335 12.6611C8.46758 12.6474 8.22541 12.7249 8.0332 12.8787L4.6582 15.5787V4.65967H20.6582V13.5787ZM6.6582 8.65967C6.6582 8.26411 6.7755 7.87743 6.99526 7.54853C7.21503 7.21963 7.52738 6.96328 7.89284 6.81191C8.25829 6.66053 8.66042 6.62093 9.04838 6.6981C9.43635 6.77527 9.79271 6.96575 10.0724 7.24545C10.3521 7.52516 10.5426 7.88153 10.6198 8.26949C10.6969 8.65745 10.6573 9.05958 10.506 9.42503C10.3546 9.79049 10.0982 10.1028 9.76934 10.3226C9.44044 10.5424 9.05377 10.6597 8.6582 10.6597C8.12777 10.6597 7.61906 10.449 7.24399 10.0739C6.86892 9.69881 6.6582 9.1901 6.6582 8.65967Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </label>
            </Box>
          )}
          <Box sx={{ mb: 2 }}>
            <textarea
              id="description"
              onChange={handleChange}
              name="description"
              placeholder="Description"
              rows={1}
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            />
          </Box>
          <div className="p-2 w-full flex justify-end">
            <button
              disabled={inLoading}
              className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
            >
              {inLoading ? 'Loading...' : '  Add Item'}
            </button>{' '}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddInventory;
