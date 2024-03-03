import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import {cityData, countryData} from '../../../constants/locationData'
const AddLocation = ({ isOpen, onRequestClose }) => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const token = localStorage.getItem('auth-token');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/locations/add`,
        { country, state, city, postal_code: postalCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      alert(res.data.message);
      onRequestClose();
    } catch (error) {
      console.error('Error adding location', error);
      alert('Error adding location');
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="add-location-modal"
      aria-describedby="add-location-form"
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down', timeout: { enter: 500 } }}
    >
      <Container maxWidth="sm" sx={{ p: 4, bgcolor: 'background.paper', transformOrigin: 'top' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Add a New Facility Location
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Box sx={{ mb: 2 }}>
            <TextField fullWidth label="Postal Code" variant="outlined" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
          </Box>
          <Button style={{backgroundColor: 'blue'}} type="submit" variant="contained" color="primary">
            Add Location
          </Button>
        </form>
      </Container>
    </Modal>
  );
};

export default AddLocation;