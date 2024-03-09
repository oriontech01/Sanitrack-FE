import React, { useContext } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from "../screens/Login";

import Schedules from '../screens/Schedules/Schedules';
import ScheduleDetails from '../screens/Schedules/ScheduleDetails';

const ScheduleStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Schedules} name="ScheduleHome" />
      <Stack.Screen component={ScheduleDetails} name="ScheduleDetail" />
    </Stack.Navigator>
  );
};
export default ScheduleStack;
