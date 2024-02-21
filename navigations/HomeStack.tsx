import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from "../screens/Login";

import Home from '../screens/Home/Home';
import Facilities from '../screens/Home/Facilities';
import Rooms from '../screens/Home/Rooms';
import ScanQr from '../screens/Home/ScanQr';
import MainRoomDetails from '../screens/Home/MainRoomDetails';
import ItemsToClean from '../screens/Home/ItemsToClean';
import CleaningItems from '../screens/Home/CleaningItems';
import Summary from '../screens/Home/Summary';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name="HomeIndex" />
      <Stack.Screen component={Facilities} name="Facilities" />
      <Stack.Screen component={Rooms} name="Rooms" />
      <Stack.Screen component={ScanQr} name="Scan" />
      <Stack.Screen component={MainRoomDetails} name="MainRoom" />
      <Stack.Screen component={ItemsToClean} name="ItemsToClean" />
      <Stack.Screen component={CleaningItems} name="CleaningItems" />
      <Stack.Screen component={Summary} name="Summary" />
    </Stack.Navigator>
  );
};
export default HomeStack;
