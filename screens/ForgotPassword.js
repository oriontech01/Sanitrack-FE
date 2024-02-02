import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../util/colors';

const ForgottenPassword = (
{navigation}
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProceed = () => {
    // Implement your logic to handle forgotten password here
  };

  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Forgot Password Page</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>PROCEED</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: colors.white,
    width: '80%',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    marginBottom: 0,
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    fontSize: 16,
  },
  proceedButton: {
    backgroundColor: colors.palepurple,
    borderRadius: 20,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  proceedButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: colors.linkcolor,
    marginTop: 20,
    fontSize: 16,
  }
});

export default ForgottenPassword;
