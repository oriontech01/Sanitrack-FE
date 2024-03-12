import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import colors from '../../util/colors';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import { UserContext } from '../../context/UserContext';

export default function ProfileHome({ navigation }) {
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <Input label="Email Address" placeholder="example@mail.com" />
      <Input label="Name" value={user.name} />
      <Input label="Password" value={'password'} secureEntry />

      <Button
        onPress={() => console.log(user)}
        style={{ marginVertical: 20, marginTop: 80 }}
        label="Save Changes"
      />
      <Button
        onPress={() => {
          user.setUser({
            name: '',
            role: '',
            id: '',
            role_id: '',
            token: '',
            email: '',
          });
          // navigation.navigate('Login', {screen: 'Auth'});
        }}
        fontStyle={{ color: '#6D0808' }}
        style={{
          backgroundColor: '#FFE0E0',
        }}
        label="Log out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  header: {
    color: colors.blue,
    fontSize: 19,
    marginTop: 20,
    fontWeight: 'bold',
  },
  label: {
    width: '100%',
    padding: 5,
    backgroundColor: '#F5F5F5',
    marginTop: 20,
  },
});
