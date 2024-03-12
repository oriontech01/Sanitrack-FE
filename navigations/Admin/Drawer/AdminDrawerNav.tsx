import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminBottomNav from '../AdminBottomNav';
import InventoryStack from '../Stack Navigators/InventoryStack';

const Drawer = createDrawerNavigator();

function AdminDrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        options={{
          drawerLabel: 'AdminDashboard',
        }}
        name="AdminMainDashboard"
        component={AdminBottomNav}
      />

      <Drawer.Screen
        options={{
          drawerLabel: 'Inventory',
        }}
        name="Inventory"
        component={InventoryStack}
      />
    </Drawer.Navigator>
  );
}
export default AdminDrawerNav;
