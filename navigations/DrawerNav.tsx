import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import Schedules from '../screens/Schedules/Schedules';

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
        component={HomeStack}
      />

      <Drawer.Screen
        options={{
          drawerLabel: 'Schedules',
        }}
        name="Schedules"
        component={Schedules}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNav;
