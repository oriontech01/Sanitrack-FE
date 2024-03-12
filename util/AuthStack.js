import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';


const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator
        initialRouteName={'Login'}
        defaultScreenOptions={Login}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Login} name="Login" />
      </Stack.Navigator>
  );
};
export default AuthStack;
