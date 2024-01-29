import { React, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import colors from "../util/colors";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { SANITRACK_API_URI } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  dropdown: {
    marginBottom: 20,
    paddingLeft: 5,
    alignSelf: "stretch",
    borderRadius: 10,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: screen.height * 0.7,
  },
  textInputWithIcon: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Vertically centers the children
    position: 'relative',
  },
  input: {
    backgroundColor: colors.lightgray,
    alignSelf: "stretch",
    marginBottom: 15,
    borderRadius: 20,
    padding: 10,
  },
  passwordInput: {
    flex: 1, // Takes up the maximum available space
    paddingRight: 30, // Adds padding to make space for the icon
    backgroundColor: colors.lightgray,
    padding: 10,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: 'center'
  },
  icon: {
    position: 'absolute', // Position the icon over the input field
    right: 10, // Distance from the right edge of the input field
    height: '100%', // Ensures the touchable area covers the height of the input field
    justifyContent: 'center', // Centers the icon vertically
    bottom: -40
  },
  button: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 5,
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 30,
    marginTop: 10
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    alignSelf: "stretch",
    padding: 10,
  },
  footerText: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  label: {
    fontSize: 22,
    marginRight: "auto",
    color: colors.primary,
  },
});

const Login = ({ navigation }) => {
  const { username, password, setPassword, setUserName } =
    useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  // const [value, setValue] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const data = [
    { label: "English", value: "English" },
    { label: "French", value: "French" },
    { label: "Spanish", value: "Spanish" },
    { label: "German", value: "German" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Italian", value: "Italian" },
    { label: "Hindi", value: "Hindi" },
  ];
  const handleLogin = async () => {
    try {
      const res = await axios.post(`https://sanitrack-node-api.onrender.com/api/login`, {
        username,
        password,
      });
      if (res.status === 200) {
        // Check for status code 200
        Alert.alert("Auth", "Login successful, redirecting...");
        console.log("user data",res.data.data)
        setUser(res.data.data); // Set user object value to the user data gotten from the Backend API
        setPassword(""); // Clear password field
        setUserName(""); // Clear username field
        if(res.data.data.requiresRoleSelection) navigation.navigate("RoleSelection") //If user has multiple roles, prompt for role selection
        else navigation.navigate("WorkOrderSelection"); // Take user to WorkOrderSelection page
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (error) {
      // Handle error here. Use error.response if you want to access the response
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      Alert.alert("Error", errorMessage);
      console.error(error);
    }
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.primary,colors.darkblue ]}
    >
       
      <View style={styles.inputContainer}>
      <Icon name="account-circle-outline"  size={100} color={colors.primary} />
        <Text style={styles.label}>Username</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="visible-password"
          value={username}
          onChangeText={(val) => setUserName(val)}
          style={styles.input}
          placeholder="John Doe"
        />
        <Text style={styles.label}>Password</Text>
        <View style={styles.textInputWithIcon}>
          
          <TextInput
            value={password}
            keyboardType={isPasswordVisible ? "visible-password": "ascii-capable"}
            onChangeText={(pass) => setPassword(pass)}
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            placeholder="**********"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
            style={styles.icon}
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
          <Text style={styles.buttonText}>PROCEED</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text onPress={() => navigation.navigate("ForgotPassword")} style={styles.footerText}>Forgot password?</Text>
        </View>
      </View>
    </LinearGradient>
  );
};
export default Login;