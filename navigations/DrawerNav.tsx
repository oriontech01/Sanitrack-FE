import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import Schedules from '../screens/Schedules/Schedules';
import BottomTabNavigation from './BottomTabNavigation';
import ScheduleStack from './ScheduleStack';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        options={{
          drawerLabel: 'Dashboard',
        }}
        name="MainDashboard"
        component={BottomTabNavigation}
      />

      <Drawer.Screen
        options={{
          drawerLabel: 'Schedules',
        }}
        name="Schedules"
        component={ScheduleStack}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNav;
