import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, LoadScriptNext } from '@react-google-maps/api';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import { FaLocationDot } from 'react-icons/fa6';
import Loader from 'component/Loader/Loader';
import useLocation from 'Hooks/useLocation';

const LocationMapView = () => {
  const [locationData, setLocationData] = useState([]);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const { loading, getLocation, allLocations } = useLocation();
  const containerStyle = {
    width: '800px',
    height: '400px'
  };

  const center = {
    lat: 9.05785,
    lng: 7.49508 // Longitude for Nigeria
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      await getLocation();
      const locations = allLocations;
      console.log('Locations Fetched', locations);

      for (const location of locations) {
        const address = `${location.city}, ${location.state}, ${location.country}`;
        const geoRes = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`
        );
        const geoData = geoRes.data.results[0].geometry.location;
        location.lat = geoData.lat;
        location.lng = geoData.lng;
      }

      setLocationData(locations);
    };

    fetchLocationData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container className="tracker-container">
      <Box className="map-container" justifyContent="center" alignContent={'center'} display={'flex'} padding="20px">
        <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap mapContainerClassName="google-map" mapContainerStyle={containerStyle} center={center} zoom={10}>
            {locationData.map(facility => (
              <Marker key={facility._id} position={{ lat: facility.lat, lng: facility.lng }} />
            ))}
          </GoogleMap>
        </LoadScriptNext>
      </Box>

      {/* Add the legend */}
      <Box className="legend" sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          Legend
        </Typography>
        <Box className="legend-item" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaLocationDot fill="red" />
          <Typography variant="body1">Facility Location</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LocationMapView;
