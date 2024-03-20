import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../../screens/Admin/Dashboard/Dashboard';
import MasterScheduleHome from '../../../screens/Admin/MasterSchedule/MasterScheduleHome';
import FacilityTimer from '../../../screens/Admin/FacilityTimers/FacilityTimer';
import FacilityTimerHome from '../../../screens/Admin/FacilityTimers/FacilityTimerHome';

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Dashboard} name="AdminHome" />
      <Stack.Screen component={MasterScheduleHome} name="MasterSchedule" />
      <Stack.Screen component={FacilityTimerHome} name="AdminTimer" />
      <Stack.Screen component={FacilityTimer} name="AdminMainTimer" />
    </Stack.Navigator>
  );
};
export default AdminStack;
