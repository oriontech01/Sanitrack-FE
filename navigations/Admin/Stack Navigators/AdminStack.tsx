import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../../screens/Admin/Dashboard/Dashboard';


const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Dashboard} name="AdminHome" />
    </Stack.Navigator>
  );
};
export default AdminStack;
