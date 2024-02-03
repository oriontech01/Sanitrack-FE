import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { UserContext } from "../context/UserContext";
import colors from "../util/colors";
import axios from "axios";

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

const SelectRole = ({navigation}) => {
  const [selectedRole, setSelectedRole] = useState('')
  const { userRole, setUserRole, user, setUser } = useContext(UserContext);

    // Effect to perform navigation after user state updates
    useEffect(() => {
      if (user.role_id) {
        if (!userRole) navigation.navigate("Login");
        // Ensure you have the correct logic here, as your current condition will always be true
        // because userRole will never be simultaneously 'Cleaner' and 'Inspector'.
        // Perhaps you meant to use && instead of ||, or you need additional checks.
        else if (userRole !== 'Cleaner' && userRole !== 'Inspector') navigation.navigate('AccessDenied')
        else navigation.navigate("WorkOrderSelection")
      }
    }, [user]); // This will trigger when user state changes

  const roles = user && Array.isArray(user.assignedRoles) ? user.assignedRoles.map((role) => ({
    label: role.role_name,
    value: role.role_name,
  })) : [];

  const handleRoleSelection = async(role) => {
    const selectedRoleId = user.assignedRoles.filter((obj) => obj.role_name === role)[0].role_id
    console.log("Selected role", selectedRoleId)
    try {
      const res =  await axios.post('https://sanitrack-service.onrender.com/api/select-role', {selectedRoleId}, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      console.log(res.data)
      if (res.status == 200){
        Alert.alert("Auth","Successfully Selected Role!")
        setUser(res.data.data)
        console.log("Response data", res.data.data) 
        console.log("User", user)  
      }
      
    } catch (error) {
      Alert.alert(error)
      console.log(error)
    }
  }
  // console.log("Select Role", user)
  // console.log("Roles", roles)
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
          setSelectedRole(item.value)
        }}
      />
      <TouchableOpacity onPress={() => handleRoleSelection(selectedRole)} style={styles.proceedButton}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRole;