import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorOrderDetail from '../../../screens/Admin/WorkOrder/WorOrderDetail';
import SelectDuration from '../../../screens/Admin/WorkOrder/SelectDuration';
import CleaningItems from '../../../screens/Admin/WorkOrder/CleaningItems';
import Personell from '../../../screens/Admin/WorkOrder/Personell';
import SuccessScree from '../../../screens/Admin/WorkOrder/SuccessScreen';
import OrderSummary from '../../../screens/Admin/WorkOrder/OrderSummary';
import WorkOrderIndexPage from '../../../screens/Admin/WorkOrder';
import SelectInspectorsWorkOrder from '../../../screens/Admin/WorkOrder/Facility Work Order/SelectInspectors';
import FacilityRoomsList from '../../../screens/Admin/WorkOrder/Facility Work Order/FacilityRoomsList';
import SelectCleanersWorkOrder from '../../../screens/Admin/WorkOrder/Facility Work Order/SelectCleaners';

const WorkOrderStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WorkOrderIndexPage} name="AdminWorkorderHome" />
      <Stack.Screen component={SelectInspectorsWorkOrder} name="SelectInspectors" />
      <Stack.Screen component={FacilityRoomsList} name="SelectUnassignedRooms" />
      <Stack.Screen component={SelectCleanersWorkOrder} name="SelectCleaners" />
      <Stack.Screen component={WorOrderDetail} name="AdminWorkorderDetail" />
      <Stack.Screen component={SelectDuration} name="SelectDuration" />
      <Stack.Screen component={CleaningItems} name="AdminCleaningItems" />
      <Stack.Screen component={Personell} name="SelectPersonel" />
      <Stack.Screen component={SuccessScree} name="OrderSuccess" />
      <Stack.Screen component={OrderSummary} name="OrderSummary" />
    </Stack.Navigator>
  );
};
export default WorkOrderStack;
