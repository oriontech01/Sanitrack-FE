import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InventoryHome from '../../../screens/Admin/Inventory/InventoryHome';

const InventoryStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={InventoryHome} name="InventoryHome" />
    </Stack.Navigator>
  );
};
export default InventoryStack;
