import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';

export default function Home({ navigation }) {
  const { userRole, user } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <AppText style={styles.haeding}>Welcome {user.username}</AppText>
      <AppText style={styles.subHeader}>
        Click below to get access to todays tasks
      </AppText>

      <Image
        source={require('../../assets/images/bro.png')}
        style={styles.image}
      />
      <Select
        onSelect={() => {}}
        placeHolder="Select Location"
        label="Select Your Location To Start with"
        options={[
          { label: 'Wuse 2', value: 'Wuse' },
          { label: 'Garki', value: 'Garki' },
        ]}
      />
      <Button
        onPress={() => navigation.navigate('Facilities')}
        style={{ marginTop: 40 }}
        label="Continue"
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
  haeding: {
    color: colors.blue,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeader: {
    color: '#999999',
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: 231,
    marginVertical: 70,
  },
});
