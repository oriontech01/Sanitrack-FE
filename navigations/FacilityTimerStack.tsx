import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FacilityTimerHome from '../screens/FacilityTimers/FacilityTimerHome';

const FacilityTimerStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={FacilityTimerHome} name="FacilityHome" />
    </Stack.Navigator>
  );
};
export default FacilityTimerStack;
