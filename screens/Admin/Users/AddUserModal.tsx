import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CloseIcon } from "../../../assets/svg/Index";
import colors from "../../../util/colors";
import useRole from "../../../Hooks/useRole";
import useLoading from "../../general_hooks/useLoading";
import useStaff from "../../../Hooks/useStaff";
import Select from "../../../components/general/Select";
import Button from "../../../components/general/Button";

const AddUserModal = ({ visible, onClose }) => {
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
  // Fetch roles when the modal is opened
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

    if (visible) {
      fetchRoles();
    }
  }, [visible]);

  const saveUser = async () => {
    startLoading();
    try {
      const userData = {
        username: username,
        password: password,
        email: email,
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        resetForm();
        onClose();
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => onClose()}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={colors.white} />
        ) : (
          <TouchableOpacity activeOpacity={1} style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New User</Text>

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

            {/* <Select op /> */}
            <Select
              options={options}
              label="Select User Role"
              onSelect={(val) => {
                console.log(val);
                setSelectedRole(val.value);
              }}
            />
            {/* Save Button */}
            {/* <TouchableOpacity style={styles.saveButton} onPress={saveUser}>
              <Text style={styles.saveButtonText}>Save User</Text>
            </TouchableOpacity> */}
            <Button
              onPress={saveUser}
              isLoading={loading}
              style={{ marginVertical: 20, marginTop: 50 }}
              label="Save User"
            />
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>
                <CloseIcon />
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: colors.blue,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    height: 40,
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
    marginTop: 20, // Added margin top for spacing
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: colors.blue, // Changed color to match the modal's title
    fontSize: 24,
  },
});

export default AddUserModal;
