import AdminStack from "./Stack Navigators/AdminStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  HomeIcon2,
  ProfileIcon,
  UsersIcon,
  WorkOrderIcon,
} from "../../assets/svg/Index";
import colors from "../../util/colors";
import ProfileHome from "../../screens/Profile/ProfileHome";
import Chat from "../../screens/Chat";
import { MessageIcon } from "../../assets/svg/Index";
import { GoogleMapIcon } from "../../assets/svg/Index";
import WorkOrderStack from "./Stack Navigators/WorkOrderStack";
import LocationStack from "./Stack Navigators/LocationStack";



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
          tabBarIcon: (props) => <GoogleMapIcon {...props} />,
          tabBarLabel: "Facilities",
        }}
        name="Facilities"
        component={LocationStack}
      />

      <Tab.Screen
        options={{
          tabBarIcon: (props) => <WorkOrderIcon {...props} />,
          tabBarLabel: 'Work Orders',
        }}
        name="WorkOrders"
        component={WorkOrderStack}
      />
      {/* <Tab.Screen
        options={{
          tabBarIcon: (props) => <MessageIcon {...props} />,
          tabBarLabel: "Messages",
        }}
        name="Messages"
        component={Chat}
      /> */}
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
