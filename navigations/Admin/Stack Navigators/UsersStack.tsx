import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Users from '../../../screens/Admin/Users/Users';
import AddUserScreen from '../../../screens/Admin/Users/AddUserScreen';

const UsersStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Users} name="UsersList" />
      <Stack.Screen component={AddUserScreen} name="AddUsers" />
    </Stack.Navigator>
  );
};
export default UsersStack;
