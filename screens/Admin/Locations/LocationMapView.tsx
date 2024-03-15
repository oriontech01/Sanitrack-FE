import React, {useEffect, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

export default function LocationMapView({locationData}) {
   const [markers, setMarkers] = useState([])

  const getLatLng = async (location) => {
    const apiKey = Constants.expoConfig.extra.googleMapsApiKey
    const address = `${location.city}, ${location.state}, ${location.country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.status === 'OK') {
        const latLng = data.results[0].geometry.location;
        return { ...latLng, title: location.city, description: `${location.city}, ${location.state}, ${location.country}` };
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  }

  useEffect(() => {
    const fetchLatLngs = async () => {
      const promises = locationData.map(location => getLatLng(location));
      const results = await Promise.all(promises);
      const validResults = results.filter(result => result !== null);
      setMarkers(validResults)
      // Now you have an array of locations with lat, lng, title, and description
      // Update your state or context with these locations to render them as markers
    };
  
    fetchLatLngs();
  }, [locationData]); 

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.length > 0 ? markers.map((marker, index) => {
         return   ( 
            <Marker
              key={index}
              coordinate={{
                latitude: marker.lat,
                longitude: marker.lng
              }}
              title={marker.title}
              description={marker.description}
            />
          )
        }) : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
