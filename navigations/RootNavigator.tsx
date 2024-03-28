import { NavigationContainer } from '@react-navigation/native';
import UserNavigationStack from './UserNavigationStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import AuthStack from './AuthStack';
import AdminDrawerNav from './Admin/Drawer/AdminDrawerNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const user = useContext(UserContext); // Assume you have user context that stores user info
  const [token, setToken] = useState('');

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user.token ? (
          user.role === 'Admin' ? (
            <RootStack.Screen name="Admin" component={AdminDrawerNav} />
          ) : (
            <RootStack.Screen name="User" component={UserNavigationStack} />
          )
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
