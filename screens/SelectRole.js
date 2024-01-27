import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { UserContext } from "../context/UserContext";
import colors from "../util/colors";

const styles = StyleSheet.create({
  selectRoleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.white,
  },
  dropDownMenu: {
    width: "80%",
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20
  },
  proceedButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  proceedButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const roles = [
  { label: "Cleaner", value: "Cleaner" },
  { label: "Inspector", value: "Inspector" },
];

const SelectRole = ({navigation}) => {
  const { userRole, setUserRole } = useContext(UserContext);
  return (
    <View style={styles.selectRoleContainer}>
      <Text style={styles.titleText}>Select A Role To Login As</Text>
      <Dropdown
        data={roles}
        value={userRole}
        placeholder="Select your Role"
        style={styles.dropDownMenu}
        labelField="label"
        valueField="value"
        onChange={(item) => {
          setUserRole(item.value);
          console.log(item.value);
        }}
      />
      <TouchableOpacity onPress={() => {
        if (!userRole) navigation.navigate("Login");
        else navigation.navigate("WorkOrderSelection")
      }} style={styles.proceedButton}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRole;