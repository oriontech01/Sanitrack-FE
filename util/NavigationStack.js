import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from "../screens/Login";
import WorkOrderSelection from '../screens/WorkOrderSelection';
import BarCode from '../screens/BarCode';
import SelectRole from './../screens/SelectRole';
import ForgotPassword from '../screens/ForgotPassword';
import Chat from '../screens/Chat';
import RoleBasedAccessDeniedScreen from '../screens/RoleBasedAccessDeniedScreen';
import CleanerDashboard from '../components/cleaner/CleanerDashboard';
import CleanerTasks from '../components/cleaner/CleanerTasks';
import CleanerRoom from '../components/cleaner/CleanerRoom';
import InspectorDashBoard from './../components/inspector/InspectorDashBoard';
import InspectorTasks from './../components/inspector/InspectorTasks';
import InspectorRooms from '../components/inspector/InspectorRoom';
import Login from '../screens/Auth/Login';
import HomeStack from '../navigations/HomeStack';
import BottomTabNavigation from '../navigations/BottomTabNavigation';
import { UserContext } from '../context/UserContext';

const NavigationStack = () => {
  const user = useContext(UserContext);
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.token ? 'Home' : 'Login'}
        // defaultScreenOptions={Login}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={BottomTabNavigation} name="Home" />
        <Stack.Screen component={SelectRole} name="RoleSelection" />
        <Stack.Screen
          component={RoleBasedAccessDeniedScreen}
          name="AccessDenied"
        />
        <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
        <Stack.Screen
          component={WorkOrderSelection}
          name="WorkOrderSelection"
        />
        {/* Inspector Screens Start*/}
        <Stack.Screen
          component={InspectorDashBoard}
          name="InspectorDashboard"
        />
        <Stack.Screen component={InspectorTasks} name="InspectorTasks" />
        <Stack.Screen component={InspectorRooms} name="InspectorRooms" />
        {/* Inspector Screens End*/}

        {/* Cleaner Screens Start*/}
        <Stack.Screen component={CleanerDashboard} name="CleanerDashboard" />
        <Stack.Screen component={CleanerTasks} name="CleanerTasks" />
        <Stack.Screen component={CleanerRoom} name="CleanerRoom" />
        {/* Cleaner Screens End*/}

        <Stack.Screen component={BarCode} name="BarCode" />
        <Stack.Screen component={Chat} name="Chat" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationStack;
