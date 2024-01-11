import {React, useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, List } from 'react-native';
import colors from '../util/colors';
// import {Picker} from '@react-native-picker/picker';

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
    alignSelf: 'stretch',
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
    marginTop: 20,
    alignItems: 'start',
    alignSelf: 'stretch',
    padding: 10,
  },
  footerText: {
    color: colors.linkcolor,
    textDecorationLine: 'underline',
    marginTop: 5,
    fontSize: 20
  },
  label: {
    fontSize: 22,
    marginRight: 'auto',
    color: colors.black,
  }
});


const Login = ({navigation}) => {
  const [value, setValue] = useState(null);
  const data = [
  { label: 'Option 1', value: 'English' },
  { label: 'Option 2', value: 'French' },
  { label: 'Option 2', value: 'Spanish' },
  { label: 'Option 2', value: 'German' },
  { label: 'Option 2', value: 'Portuguese' },
  { label: 'Option 2', value: 'Italian' },
  { label: 'Option 2', value: 'Hindi' },
];

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
         <Text>Select Language</Text> 
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => {
          navigation.navigate('WorkOrderSelection')
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