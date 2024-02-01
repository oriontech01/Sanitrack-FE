import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../../styles/Tracker.scss";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
<<<<<<< HEAD:src/pages/Tracker.jsx
import { useTranslation } from 'react-i18next';

=======
import AddLocation from "../../components/Form/AddLocation";
>>>>>>> 951514aba50d165272dd75807afb8afea79e5946:src/pages/Admin/Tracker.jsx
const Tracker = () => {
  const {t} = useTranslation()
  const [locationData, setLocationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const token = localStorage.getItem("auth-token");
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_API_KEY

  const containerStyle = {
    width: "800px",
    height: "400px",
  };

  const center = {
    lat: 9.05785000,    
    lng: 7.49508000,  // Longitude for Nigeria
  };  
  

  useEffect(() => {
    const getFacilitiesLocation = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_LOCAL_URL}locations/`,
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
        // console.log("GeoRes: " + JSON.stringify(geoRes.data));
        const geoData = geoRes.data.results[0].geometry.location;
        location.lat = geoData.lat;
        location.lng = geoData.lng;
      }

      // console.log("Location Data", locations);
      setLocationData(locations);
    };

    getFacilitiesLocation();
  }, []);

  return (
    <div className="tracker-container">
    <div className="location-header">
<<<<<<< HEAD:src/pages/Tracker.jsx
      <h2>{t('Location Management')}</h2> <button>{t('Add Location')}</button>
=======
      <h2>Location Management</h2> <button onClick={() => setIsModalOpen(true)}>Add Location</button>
>>>>>>> 951514aba50d165272dd75807afb8afea79e5946:src/pages/Admin/Tracker.jsx
    </div>
      
      <div className="map-container">
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
      </div>
      <AddLocation isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}/>
      {/* Add the legend */}
      <div className="legend">
        <h3>{t('Legend')}</h3>
        <div className="legend-item">
          <FaLocationDot fill="red"/>
          <span>{t('Facility Location')}</span>
        </div>
      </div>
    </div>
  );
};

export default Tracker;