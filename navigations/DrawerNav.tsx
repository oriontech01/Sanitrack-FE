import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './HomeStack';
import Schedules from '../screens/Schedules/Schedules';
import BottomTabNavigation from './BottomTabNavigation';
import ScheduleStack from './ScheduleStack';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ComingSoon from '../screens/ComingSoon';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  const { role } = useContext(UserContext);
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

      {role == 'Inspector' && (
        <Drawer.Screen
          options={{
            drawerLabel: 'Release Timer',
          }}
          name="Release"
          component={ComingSoon}
        />
      )}
    </Drawer.Navigator>
  );
}
export default DrawerNav;
