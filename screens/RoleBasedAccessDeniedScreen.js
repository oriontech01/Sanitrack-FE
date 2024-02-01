import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import colors from '../util/colors';

const RoleBasedAccessDeniedScreen = ({ userRole }) => {
  const webAppURL = "https://sanitrack.vercel.app/"; // Replace with your web app's URL

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Denied!</Text>
      <Text style={styles.message}>
        Unfortunately, Manager role cannot access the mobile app.
      </Text>
      <Text style={styles.instruction}>
        Please visit our web application for full access.
      </Text>
      <Button  title="Go to Web App" onPress={() => Linking.openURL(webAppURL)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.red
  },
  message: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.white
  },
  instruction: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.white
  },
});

export default RoleBasedAccessDeniedScreen;