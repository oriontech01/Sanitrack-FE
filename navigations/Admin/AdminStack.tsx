import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Admin/Home';

const AdminStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen component={Home} name="AdminHome"/>
    </Stack.Navigator>
  );
};
export default AdminStack;
