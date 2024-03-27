import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AdminBottomNav from "../AdminBottomNav";
import InventoryStack from "../Stack Navigators/InventoryStack";
import UsersStack from "../Stack Navigators/UserStack";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import LearningDashboard from "../../../screens/Learning";
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 500,
  },
  logo: {
    height: 100, // Set the dimensions as per your requirement
    width: 100, // Set the dimensions as per your requirement
  },
});
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <DrawerItemList {...props} />
        </ScrollView>
        <View style={styles.logoContainer}>
          {/* Put your own image path for the logo */}
          <Image
            source={require("../../../assets/images/logo2.jpg")}
            style={styles.logo}
          />
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function AdminDrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{
          drawerLabel: "AdminDashboard",
        }}
        name="AdminMainDashboard"
        component={AdminBottomNav}
      />

      <Drawer.Screen
        options={{
          drawerLabel: "Inventory",
        }}
        name="Inventory"
        component={InventoryStack}
      />

      <Drawer.Screen
        options={{
          drawerLabel: "Users",
        }}
        name="Users"
        component={UsersStack}
      />

      <Drawer.Screen
        options={{
          drawerLabel: "Training",
        }}
        name="Training"
        component={LearningDashboard}
      />
    </Drawer.Navigator>
  );
}
export default AdminDrawerNav;
