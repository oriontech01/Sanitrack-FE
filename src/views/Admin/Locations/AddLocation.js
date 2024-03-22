import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { cityData, countryData } from '../../../constants/locationData';
import NetworkDetector from 'utils/networkDetector';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast, Flip } from 'react-toastify';

const AddLocation = ({ isOpen, onRequestClose, isDisconnected }) => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [facilityName, setFacilityName] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const token = localStorage.getItem('auth-token');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Update states when country changes
  useEffect(() => {
    setStates(countryData[country] || []);
    setState('');
  }, [country]);

  // Update cities when state changes
  useEffect(() => {
    setCities(cityData[state] || []);
    setCity('');
  }, [state]);

  const saveDataOffline = data => {
    localStorage.setItem('offlineLocationData', JSON.stringify(data));
  };

  const loadDataOffline = () => {
    return JSON.parse(localStorage.getItem('offlineLocationData'));
  };
  let savedData;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // if (isDisconnected) {
    //   saveDataOffline({ country, state, city, facility_name: facilityName });
    // } else {
    //   savedData = loadDataOffline();
    //   const res = await axios.post(`${BASE_URL}/locations/add`, savedData, { headers: { Authorization: `Bearer ${token}` } });
    // }
    try {
      const res = await axios.post(
        `${BASE_URL}/locations/add`,
        {  country, state, city, facility_name: facilityName  },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      // alert(res.data.message);
      if (res.data) {
        setLoading(false);
        toast.success('Room Added Successfully', {
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

        setTimeout(() => {
          onRequestClose();
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        const { status, data } = error.response;
        if (status === 400 && data && data.message) {
          setResponseMessage(data?.message);
          toast.error(data?.message, {
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
          console.log('An error occured', data?.message);
        } else if (status === 403 && data && data?.message) {
          console.log('An error with status 403 occured', data?.message);
          setResponseMessage(data?.message);
        } else {
          toast.error(error?.message, {
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
          console.log('Axios error:', error);
        }
      } else {
        console.log('Network error:', error?.message);
      }
      // alert('Error adding location');
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal
        open={isOpen}
        onClose={onRequestClose}
        aria-labelledby="add-location-modal"
        aria-describedby="add-location-form"
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'down', timeout: { enter: 500 } }}
      >
        <Container
          maxWidth="sm"
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            ...(fullScreen && { maxHeight: '100vh', overflowY: 'auto' })
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Add a New Facility Location
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Facility Name"
                variant="outlined"
                value={facilityName}
                onChange={e => setFacilityName(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select value={country} label="Country" onChange={e => setCountry(e.target.value)}>
                  {Object.keys(countryData).map(country => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth disabled={!states.length}>
                <InputLabel>State/Province</InputLabel>
                <Select value={state} label="State/Province" onChange={e => setState(e.target.value)}>
                  {states.map(state => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth disabled={!cities.length}>
                <InputLabel>City</InputLabel>
                <Select value={city} label="City" onChange={e => setCity(e.target.value)}>
                  {cities.map(city => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button type="submit" variant="contained" disabled={loading} style={{ backgroundColor: 'blue' }}>
              {loading ? 'Processing...' : 'Add Facilties'}
            </Button>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default NetworkDetector(AddLocation);
