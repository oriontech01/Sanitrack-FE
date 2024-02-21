import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import colors from '../../util/colors';
import AppText from '../../components/AppText';
import Select from '../../components/general/Select';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { Decoration } from '../../assets/svg/Index';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';

export default function Login({ navigation }) {
  const { username, password, setPassword, setUserName } =
    useContext(AuthContext);
  const { setUser, setUserRole, userRole } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log('Base URL', Constants.expoConfig.extra.baseUrl);
    try {
      const res = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}login`,
        {
          username,
          password,
        }
      );
      setIsLoading(false); // Stop loading indicator when the request is done
      if (res.status === 200) {
        // Check for status code 200
        Alert.alert('Auth', 'Login successful, redirecting...');
        console.log('user data', res.data.data);
        // registerForPushNotificationsAsync(res.data.data.token); // Send push notification token to server
        setUser(res.data.data); // Set user object value to the user data gotten from the Backend API
        setPassword(''); // Clear password field
        setUserName(''); // Clear username field
        if (res.data.data.username === 'manager')
          navigation.navigate('AccessDenied');
        else if (res.data.data.requiredRoleSelection) {
          navigation.navigate('RoleSelection');
        } else {
          if (res.data.data.username === 'user add') setUserRole('Cleaner');
          navigation.navigate('Home'); // Take user to WorkOrderSelection page
        }
      } else {
        Alert.alert('Error', res.data.message);
      }
    } catch (error) {
      setIsLoading(false); // Stop loading indicator if there's an error
      // Handle error here. Use error.response if you want to access the response
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      Alert.alert('Error', errorMessage);
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Decoration />
      <AppText style={styles.haeding}>Account Login</AppText>
      <AppText style={styles.subHeader}>
        Enter your details to get access to your account
      </AppText>
      <Select
        placeHolder="Select Your Role"
        options={[
          { label: 'One', value: 'One' },
          { label: 'Two', value: 'Two' },
        ]}
        label="Role"
        onSelect={(val) => {
          console.log(val);
        }}
      />
      <Input
        value={username}
        onChange={(val) => setUserName(val)}
        label="User Name"
        placeholder="Enter Your User Name"
      />
      <Input
        value={password}
        onChange={(pass) => setPassword(pass)}
        label="Password"
        placeholder="Enter Your Password"
        secureEntry
      />
      <Text
        style={{
          marginLeft: 'auto',
          color: colors.blue,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Forgot Password
      </Text>
      <Button
        onPress={handleLogin}
        isLoading={isLoading}
        style={{ marginVertical: 20, marginTop: 50 }}
        label="Login"
      />

      <Button
        fontStyle={{ color: colors.blue }}
        style={{
          backgroundColor: 'rgba(224, 232, 255,0.3)',
          borderColor: colors.blue,
          borderWidth: 1,
        }}
        label="Create Account"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    padding: 20,
  },
  haeding: {
    color: colors.darkblue,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 80,
  },
  subHeader: {
    color: '#999999',
    fontSize: 15,
  },
});
