import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FacilityTimerHome from '../screens/FacilityTimers/FacilityTimerHome';
import FacilityTimer from '../screens/FacilityTimers/FacilityTimer';

const FacilityTimerStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={FacilityTimerHome} name="FacilityHome" />
      <Stack.Screen component={FacilityTimer} name="FacilityMainTimer" />
    </Stack.Navigator>
  );
};
export default FacilityTimerStack;
