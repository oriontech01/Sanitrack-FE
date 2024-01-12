import {React, useState, useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import colors from '../util/colors';
import { Dropdown } from 'react-native-element-dropdown';
import {AuthContext} from '../context/AuthContext';

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C6BC0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dropdown: {
    marginBottom: 20,
    paddingLeft: 5,
    alignSelf: 'stretch',
    borderRadius: 10
  },
  dropdownText: {
    color: '#FFF',
    backgroundColor: '#7986CB',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#9FA8DA',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: screen.height * .60,
  },
  input: {
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    marginBottom: 15,
    borderRadius: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#7986CB',
    padding: 25,
    borderRadius: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    alignSelf: 'stretch',
    padding: 10,
  },
  footerText: {
    color: colors.white,
    textDecorationLine: 'underline',
    fontSize: 15
  },
  label: {
    fontSize: 22,
    marginRight: 'auto',
    color: colors.black,
  }
});

const Login = ({navigation}) => {
  const {username, password, setPassword, setUserName} = useContext(AuthContext)
  const [value, setValue] = useState(null);
  const data = [
  { label: 'English', value: 'English' },
  { label: 'French', value: 'French' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'German', value: 'German' },
  { label: 'Portuguese', value: 'Portuguese' },
  { label: 'Italian', value: 'Italian' },
  { label: 'Hindi', value: 'Hindi' },
];
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        placeholder='Select Language'
        labelField="label"
        valueField="value"
        iconColor={colors.black}
        value={value}
        placeholderStyle={{color: colors.white}}
        onChange={item => {
          setValue(item.value);
        }}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          value={username}
          onChangeText={(val) => setUserName(val)}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={(pass) => setPassword(pass)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => {
          username ? navigation.navigate('WorkOrderSelection') : null
        }} style={styles.button}>
          <Text style={styles.buttonText}>PROCEED</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Forgot password?</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Signup")
          }}>
            <Text style={styles.footerText}>Create an Account</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};
export default Login;