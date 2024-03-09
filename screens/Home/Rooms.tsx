import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';
import {
  ArrowLeftIcon,
  EyeScan,
  Location,
  QrCode,
} from '../../assets/svg/Index';
import FacilityList from './components/FacilityList';

export default function Rooms({ navigation, route }) {
  const { location, facility, taskId, cleaner_time } = route.params;
  const { role } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>{facility.roomName}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Scan')}
        style={styles.menu}>
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/images/qrFrame.png')}
          style={styles.image}>
          <QrCode />
          <Text style={styles.label}>Scan QR-Code</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ItemsToClean', {
            params: JSON.stringify({
              location,
              facility,
              taskId,
              id: taskId,
              cleaner_time,
            }),
          });
        }}
        style={styles.menu}>
        <ImageBackground
          resizeMode="contain"
          source={require('../../assets/images/qrFrame.png')}
          style={styles.image}>
          <EyeScan />
          <Text style={styles.label}>View Order List</Text>
        </ImageBackground>
      </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  image: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 10,
  },
  menu: {
    height: 250,
    width: '100%',
    marginTop: 50,
  },
  innerImage: {
    height: 200,
    width: '100%',
  },
  label: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
