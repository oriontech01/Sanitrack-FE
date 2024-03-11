import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Admin/Home';
import FacilityOverview from '../../components/Admin/Locations/FacilityOverview';

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen component={Home} name="AdminHome"/>
       <Stack.Screen component={FacilityOverview} name="FacilityOverview"/>
    </Stack.Navigator>
  );
};
export default AdminStack;
