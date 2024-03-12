import { StyleSheet } from 'react-native';
import AdminStack from './AdminStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import {
  ClockIcon,
  ClockIcon2,
  HomeIcon2,
  LocationsIcon,
  NotificationIcon,
  ProfileIcon,
  UsersIcon,
  WorkOrderIcon,
} from '../../assets/svg/Index';
import colors from '../../util/colors';
import ProfileHome from '../../screens/Profile/ProfileHome';
import Location from '../../screens/Admin/Location';
import Users from '../../screens/Admin/Users';
import WorkOrders from '../../screens/Admin/WorkOrder/WorkOrders';
import WorkOrderStack from './Stack Navigators/WorkOrderStack';

const Tab = createBottomTabNavigator();
const AdminBottomNav = () => {
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
      initialRouteName="AdminHome">
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <HomeIcon2 {...props} />,
          tabBarLabel: 'Home',
        }}
        name="Home"
        component={AdminStack}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <UsersIcon {...props} />,
          tabBarLabel: 'Users',
        }}
        name="Users"
        component={Users}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <LocationsIcon {...props} />,
          tabBarLabel: 'Locations',
        }}
        name="Locations"
        component={Location}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <WorkOrderIcon {...props} />,
          tabBarLabel: 'Work Orders',
        }}
        name="WorkOrders"
        component={WorkOrderStack}
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

export default AdminBottomNav;

const styles = StyleSheet.create({});
