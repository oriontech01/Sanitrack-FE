import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import WorkOrderSelection from '../screens/WorkOrderSelection';
import WorkOrderLocations from '../screens/WorkOrderLocations';
import BarCode from '../screens/BarCode';
import Room from '../screens/Room';
import SelectRole from './../screens/SelectRole';
import ForgotPassword from '../screens/ForgotPassword';
import Chat from '../screens/Chat';
import RoleBasedAccessDeniedScreen from '../screens/RoleBasedAccessDeniedScreen';
const NavigationStack = () => {
  const Stack  = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
           <Stack.Screen component={Login} name='Login'/>
           <Stack.Screen component={SelectRole} name='RoleSelection'/>
           <Stack.Screen component={RoleBasedAccessDeniedScreen} name='AccessDenied'/>
           <Stack.Screen component={ForgotPassword} name='ForgotPassword'/>
           <Stack.Screen component={Room} name='Room'/>
           <Stack.Screen component={WorkOrderSelection} name='WorkOrderSelection'/>
           <Stack.Screen component={WorkOrderLocations} name='WorkOrderLocations'/>
           <Stack.Screen component={BarCode} name='BarCode'/>
           <Stack.Screen component={Chat} name='Chat'/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavigationStack