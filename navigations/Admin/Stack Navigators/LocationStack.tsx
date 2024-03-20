import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Location from '../../../screens/Admin/Locations/Location';
import SingleLocationOverview from '../../../screens/Admin/Locations/SingleLocationOverview';
import LocationFacilityDetails from '../../../screens/Admin/Locations/LocationFacilityDetails';

const LocationStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Location} name="LocationHome" />
      <Stack.Screen component={SingleLocationOverview} name="LocationDetails" />
      <Stack.Screen component={LocationFacilityDetails} name="LocationFacilityDetails" />
    </Stack.Navigator>
  );
};
export default LocationStack;
