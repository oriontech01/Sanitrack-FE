import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../../../util/colors";
import useRole from "../../../Hooks/useRole";
import useLoading from "../../general_hooks/useLoading";
import useStaff from "../../../Hooks/useStaff";
import Select from "../../../components/general/Select";
import Button from "../../../components/general/Button";
import { Ionicons } from "@expo/vector-icons";

const AddUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    home_address: "",
  });
  const { getRoles, roles } = useRole();
  const [selectedRole, setSelectedRole] = useState("");
  const { startLoading, stopLoading, loading } = useLoading();
  const { addStaff } = useStaff();

  useEffect(() => {
    const fetchRoles = async () => {
      startLoading();
      try {
        await getRoles();
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };
    fetchRoles();
  }, []);

  const saveUser = async () => {
    startLoading();
    try {
      const userData = {
        username,
        password,
        email,
        address: {
          country: address.country,
          state: address.state,
          city: address.city,
          home_address: address.home_address,
        },
        phone_number: phoneNumber,
        role_id: selectedRole,
        role_name: roles.find((role) => role._id === selectedRole)?.role_name,
      };
      console.log(userData);
      await addStaff(userData);
      resetForm();
    } catch (error) {
      console.log(error);
    }
    stopLoading();
  };

  // Resets form fields
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setPhoneNumber("");
    setAddress({
      country: "",
      state: "",
      city: "",
      home_address: "",
    });
    setSelectedRole("");
  };
  const options = roles.map((role) => {
    return {
      label: role.role_name,
      value: role._id,
    };
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.centeredView}>
        {loading ? (
          <ActivityIndicator size={"small"} color={colors.blue} />
        ) : (
          <TouchableOpacity activeOpacity={1} style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                alignContent: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={24}
                  color={colors.blue}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.modalTitle}>Add New User</Text>
              </View>
            </View>
            {/* User Name Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Enter user name"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Enter password"
                secureTextEntry // hides the password input
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Enter email"
                keyboardType="email-address" // sets the appropriate keyboard for emails
              />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad" // sets the appropriate keyboard for phone input
              />
            </View>

            {/* Country Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setAddress({ ...address, country: text })
                }
                value={address.country}
                placeholder="Enter country"
              />
            </View>

            {/* State Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAddress({ ...address, state: text })}
                value={address.state}
                placeholder="Enter state"
              />
            </View>

            {/* City Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAddress({ ...address, city: text })}
                value={address.city}
                placeholder="Enter city"
              />
            </View>

            {/* Home Address Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  setAddress({ ...address, home_address: text })
                }
                value={address.home_address}
                placeholder="Enter home address"
              />
            </View>

            {/* <Select options /> */}
            <Select
              options={options}
              label="Select User Role"
              onSelect={(val) => {
                console.log(val);
                setSelectedRole(val.value);
              }}
            />
            {/* Save Button */}
            <Button
              onPress={saveUser}
              isLoading={loading}
              style={{ marginVertical: 20, marginTop: 50 }}
              label="Save User"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "100%",
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: colors.blue,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: colors.blue,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "100%",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddUserScreen;