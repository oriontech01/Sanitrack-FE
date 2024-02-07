import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import AddLocation from "./AddLocation";
import Loader from "component/Loader/Loader";

const Facilities = () => {
  const [locationData, setLocationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("auth-token");
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  console.log(googleMapsApiKey)

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  const center = {
    lat: 9.05785,
    lng: 7.49508, // Longitude for Nigeria
  };

  useEffect(() => {
    const getFacilitiesLocation = async () => {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}locations/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const locations = res.data.data.allLocations;

      for (const location of locations) {
        const address = `${location.city}, ${location.state}, ${location.country}`;
        const geoRes = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${googleMapsApiKey}`
        );
        const geoData = geoRes.data.results[0].geometry.location;
        location.lat = geoData.lat;
        location.lng = geoData.lng;
      }

      setLocationData(locations);
      setLoading(false);
    };

    getFacilitiesLocation();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container className="tracker-container">
      <Box className="location-header" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h2">Facilities</Typography>
        <Button onClick={() => setIsModalOpen(true)}  variant="contained">Add Location</Button>
      </Box>

      <Box className="map-container" justifyContent="center" alignContent={"center"} display={"flex"} padding="20px">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerClassName="google-map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {locationData.map((facility) => (
              <Marker
                key={facility._id}
                position={{ lat: facility.lat, lng: facility.lng }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </Box>
      <AddLocation
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      {/* Add the legend */}
      <Box className="legend" sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>Legend</Typography>
        <Box className="legend-item" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaLocationDot fill="red" />
          <Typography variant="body1">Facility Location</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Facilities;
