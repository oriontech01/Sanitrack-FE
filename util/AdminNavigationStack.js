import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectRole from "../screens/SelectRole";
import ForgotPassword from "../screens/ForgotPassword";
import Login from "../screens/Auth/Login";
import AdminBottomNav from "../navigations/Admin/AdminBottomNav";
import { UserContext } from "../context/UserContext";

const AdminNavigationStack = () => {
  const user = useContext(UserContext);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={"AdminHome"}
      defaultScreenOptions={AdminBottomNav}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={AdminBottomNav} name="AdminHome" />
      <Stack.Screen component={SelectRole} name="RoleSelection" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
    </Stack.Navigator>
  );
};
export default AdminNavigationStack;
