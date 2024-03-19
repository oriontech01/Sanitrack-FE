import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Facilities from '../screens/Home/Facilities';
import Rooms from '../screens/Home/Rooms';
import ScanQr from '../screens/Home/ScanQr';
import MainRoomDetails from '../screens/Home/MainRoomDetails';
import ItemsToClean from '../screens/Home/ItemsToClean';
import CleaningItems from '../screens/Home/CleaningItems';
import Summary from '../screens/Home/Summary';
import SuccessScree from '../screens/Home/SuccessScree';
import { UserContext } from '../context/UserContext';
import InspectorItemsToClean from '../screens/Home/Inspector/InspectorItemsToClean';
import InspectorTimer from '../screens/Home/Inspector/InspectorTimer';
import CloseWorkOrder from '../screens/Home/Inspector/CloseWorkOrder';
import InspectorSummary from '../screens/Home/Inspector/InspectorSummary';
import RequestCleaningItems from '../screens/Home/RequestCleaningItems';
import RequestSummary from '../screens/Home/RequestSummary';
import FacilityTimerStack from './FacilityTimerStack';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const { role } = useContext(UserContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Home} name="HomeIndex" />
      <Stack.Screen component={Facilities} name="Facilities" />
      <Stack.Screen component={Rooms} name="Rooms" />
      <Stack.Screen component={ScanQr} name="Scan" />
      <Stack.Screen component={MainRoomDetails} name="MainRoom" />
      <Stack.Screen
        component={role == 'Inspector' ? InspectorItemsToClean : ItemsToClean}
        name="ItemsToClean"
      />
      <Stack.Screen component={CleaningItems} name="CleaningItems" />
      <Stack.Screen component={Summary} name="Summary" />
      <Stack.Screen component={SuccessScree} name="Success" />
      <Stack.Screen component={InspectorTimer} name="InspectorTimer" />
      <Stack.Screen component={CloseWorkOrder} name="CloseOrder" />
      <Stack.Screen component={InspectorSummary} name="InspectorSummary" />
      <Stack.Screen component={RequestCleaningItems} name="RequestItems" />
      <Stack.Screen component={RequestSummary} name="RequestSummary" />
      <Stack.Screen component={FacilityTimerStack} name="FacilityTimer" />
    </Stack.Navigator>
  );
};
export default HomeStack;
