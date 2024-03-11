import { StyleSheet } from "react-native";
import AdminStack from "./AdminStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import {
  ClockIcon,
  ClockIcon2,
  HomeIcon2,
  NotificationIcon,
  ProfileIcon,
} from "../../assets/svg/Index";
import colors from "../../util/colors";
import ProfileHome from "../../screens/Profile/ProfileHome";
import Location from "../../screens/Admin/Location";
import Users from "../../screens/Admin/Users";
import WorkOrders from "../../screens/Admin/WorkOrders";
import Chat from "../../screens/Chat";
import { MessageIcon } from "../../assets/svg/Index";
import { GoogleMapIcon } from "../../assets/svg/Index";

const Tab = createBottomTabNavigator();
const AdminBottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // @ts-ignore
        tabBarStyle: {
          backgroundColor: "#fff",
        },

        tabBarInactiveTintColor: "#999999",
        tabBarActiveTintColor: colors.blue,
      }}
      initialRouteName="AdminHome"
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <HomeIcon2 {...props} />,
          tabBarLabel: "Home",
        }}
        name="Home"
        component={AdminStack}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <ClockIcon {...props} />,
          tabBarLabel: "Users",
        }}
        name="Users"
        component={Users}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <GoogleMapIcon {...props}  />,
          tabBarLabel: "Locations",
        }}
        name="Locations"
        component={Location}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <NotificationIcon {...props} />,
          tabBarLabel: "Work Orders",
        }}
        name="Work Orders"
        component={WorkOrders}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <ProfileIcon {...props} />,
          tabBarLabel: "Profile",
        }}
        name="Profile"
        component={ProfileHome}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <MessageIcon {...props} />,
          tabBarLabel: "Messages",
        }}
        name="Messages"
        component={Chat}
      />
    </Tab.Navigator>
  );
};

export default AdminBottomNav;

const styles = StyleSheet.create({});
