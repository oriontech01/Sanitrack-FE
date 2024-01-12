import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import WorkOrderSelection from '../screens/WorkOrderSelection';
import WorkOrderLocations from '../screens/WorkOrderLocations';
import BarCode from '../screens/BarCode';
import Room from '../screens/Room';
const NavigationStack = () => {
  const Stack  = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
           <Stack.Screen component={Login} name='Login'/>
           <Stack.Screen component={SignUp} name='Signup'/>
           <Stack.Screen component={WorkOrderSelection} name='WorkOrderSelection'/>
           <Stack.Screen component={WorkOrderLocations} name='WorkOrderLocations'/>
           <Stack.Screen component={BarCode} name='BarCode'/>
           <Stack.Screen component={Room} name='Room'/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationStack