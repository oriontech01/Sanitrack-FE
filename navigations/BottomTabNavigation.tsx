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
import { NotificationContext } from '../context/NotificationContext';
import NotificationIconWithBadge from '../assets/svg/NotificationIconWithBadge';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const {notifications} = useContext(NotificationContext)
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
        component={HomeStack}
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
          tabBarIcon: (props) => notifications.length > 0 ? <NotificationIconWithBadge unreadCount={notifications.length}/> : <NotificationIcon {...props} /> ,
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
