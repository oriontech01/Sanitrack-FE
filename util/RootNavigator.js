import { NavigationContainer } from "@react-navigation/native";
import AdminNavigationStack from "./AdminNavigationStack";
import UserNavigationStack from "./UserNavigationStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import AuthStack from "./AuthStack";


const RootStack = createNativeStackNavigator()

const RootNavigator = () => {
  const user  = useContext(UserContext); // Assume you have user context that stores user info
  console.log(useContext(UserContext))

  useEffect(() => {
    console.log("Rerender")
  }, [user.token])
  return (
    <NavigationContainer>
      <RootStack.Navigator
      screenOptions={{ headerShown: false }}>
        {user.token ? (
          user.role === "Admin" ? (
            <RootStack.Screen name="Admin" component={AdminNavigationStack} />
          ) : (
            <RootStack.Screen name="User" component={UserNavigationStack} />
          )
        ) : <RootStack.Screen name="Auth" component={AuthStack} /> }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator