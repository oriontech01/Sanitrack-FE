import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Location() {
  // Define your locations
  const markers = [
    { latlng: { latitude: 37.78825, longitude: -122.4324 }, title: "Marker 1", description: "This is marker 1" },
    { latlng: { latitude: 37.78825, longitude: -2.4324 }, title: "Marker 2", description: "This is marker 2" }
    // Add as many markers as you like
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
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
