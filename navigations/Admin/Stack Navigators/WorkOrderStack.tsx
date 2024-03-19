import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkOrders from '../../../screens/Admin/WorkOrder/WorkOrders';
import WorOrderDetail from '../../../screens/Admin/WorkOrder/WorOrderDetail';
import SelectDuration from '../../../screens/Admin/WorkOrder/SelectDuration';
import CleaningItems from '../../../screens/Admin/WorkOrder/CleaningItems';
import Personell from '../../../screens/Admin/WorkOrder/Personell';
import SuccessScree from '../../../screens/Admin/WorkOrder/SuccessScreen';

const WorkOrderStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WorkOrders} name="AdminWorkorderHome" />
      <Stack.Screen component={WorOrderDetail} name="AdminWorkorderDetail" />
      <Stack.Screen component={SelectDuration} name="SelectDuration" />
      <Stack.Screen component={CleaningItems} name="AdminCleaningItems" />
      <Stack.Screen component={Personell} name="SelectPersonel" />
      <Stack.Screen component={SuccessScree} name="OrderSuccess" />
    </Stack.Navigator>
  );
};
export default WorkOrderStack;