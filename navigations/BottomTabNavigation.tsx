import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect } from 'react';
import HomeStack from './HomeStack';
import {
  ClockIcon,
  ClockIcon2,
  HomeIcon2,
  NotificationIcon,
  ProfileIcon,
} from '../assets/svg/Index';
import colors from '../util/colors';
import TimerHome from '../screens/Timer/TimerHome';
import NotificationHome from '../screens/Notifications/NotificationsHome';
import ProfileHome from '../screens/Profile/ProfileHome';
import { UserContext } from '../context/UserContext';
import DrawerNav from './DrawerNav';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // @ts-ignore
        tabBarStyle: {
          backgroundColor: '#fff',
        },

        tabBarInactiveTintColor: '#999999',
        tabBarActiveTintColor: colors.blue,
      }}
      initialRouteName="CleanerHome">
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <HomeIcon2 {...props} />,
          tabBarLabel: 'Home',
        }}
        name="CleanerHome"
        component={DrawerNav}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <ClockIcon {...props} />,
          tabBarLabel: 'Timer',
        }}
        name="CleanerTimer"
        component={TimerHome}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <NotificationIcon {...props} />,
          tabBarLabel: 'Notification',
        }}
        name="CleanerNotifications"
        component={NotificationHome}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <ProfileIcon {...props} />,
          tabBarLabel: 'Profile',
        }}
        name="Profile"
        component={ProfileHome}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});
