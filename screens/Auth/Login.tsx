import {
  Alert,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  const { setUser } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      console.log(Constants.expoConfig.extra.baseUrl);
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

        if (res.data.data.requiredRoleSelection) {
          const options = res.data.data.assignedRoles.map((role) => {
            return { label: role.role_name, value: role.role_id };
          });
          setOptions(options);
          setToken(res.data.data.token);
          setModalVisible(true);
          return;
        }
        console.log(res.data.data);
        // registerForPushNotificationsAsync(res.data.data.token); // Send push notification token to server
        setUser({
          name: res.data.data.username,
          role: res.data.data.role_name,
          id: res.data.data.userId,
          role_id: res.data.data.role_id,
          token: res.data.data.token,
          email: '',
        }); // Set user object value to the user data gotten from the Backend API
        setPassword(''); // Clear password field
        setUserName(''); // Clear username field
        navigation.navigate('Home');
        // if (res.data.data.username === 'manager')
        //   navigation.navigate('AccessDenied');
        // else if (res.data.data.requiredRoleSelection) {
        //   navigation.navigate('RoleSelection');
        // } else {
        //   if (res.data.data.username === 'user add')
        //     navigation.navigate('Home'); // Take user to WorkOrderSelection page
        // }
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

  const handleRoleSelection = async () => {
    setIsLoading2(true);
    console.log('Base URL', Constants.expoConfig.extra.baseUrl);
    try {
      const res = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}select-role`,
        {
          selectedRoleId: selectedValue,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsLoading2(false); // Stop loading indicator when the request is done
      if (res.status === 200) {
        // Check for status code 200
        Alert.alert('Auth', 'Login successful, redirecting...');
        console.log('user data', res.data.data);
        setModalVisible(false);
        setUser({
          name: res.data.data.username,
          role: res.data.data.role_name,
          id: res.data.data.userId,
          role_id: res.data.data.role_id,
          token: res.data.data.token,
          email: '',
        });

        // registerForPushNotificationsAsync(res.data.data.token); // Send push notification token to server
        //  Set user object value to the user data gotten from the Backend API
        setPassword(''); // Clear password field
        setUserName(''); // Clear username field
        navigation.navigate('Home');
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

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.overlay}>
          <View style={styles.selectRole}>
            <Select
              options={options}
              label="Select a role to continue"
              onSelect={(val) => {
                setSelectedValue(val.value);
              }}
            />
            <Button
              isLoading={isLoading2}
              onPress={handleRoleSelection}
              style={{
                marginTop: 'auto',
                marginBottom: 30,
              }}
              label="Proceed"
            />
          </View>
        </View>
      </Modal>
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
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5 )',
    flex: 1,
  },
  selectRole: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
    backgroundColor: '#fff',
    marginTop: 'auto',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
});
