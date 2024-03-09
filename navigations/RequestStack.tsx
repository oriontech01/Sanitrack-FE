import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from "../screens/Login";

import RequestHome from '../screens/Request/RequestHome';
import RequestDetail from '../screens/Request/RequestDetail';
import RequestApproval from '../screens/Request/RequestApproval';

const RequestStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={RequestHome} name="RequestHome" />
      <Stack.Screen component={RequestDetail} name="RequestDetail" />
      <Stack.Screen component={RequestApproval} name="RequestApproval" />
    </Stack.Navigator>
  );
};
export default RequestStack;
