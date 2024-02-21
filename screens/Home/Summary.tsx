import {
  Image,
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
import { ArrowLeftIcon, Location } from '../../assets/svg/Index';
import FacilityList from './components/FacilityList';

export default function Summary({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Summary</Text>
      </TouchableOpacity>
      <View style={styles.locationDetails}>
        <View style={styles.location}>
          <Location />
        </View>

        <Text style={{ marginTop: 10 }}>Work Order Address</Text>
        <Text style={styles.locationName}>
          28 Aminu Kano Crescent, Wuse 2. Abuja
        </Text>
      </View>

      <Text style={[styles.haeding, { marginLeft: 0, marginTop: 20 }]}>
        Facility Lis
      </Text>

      <FacilityList />
      <FacilityList />
      <FacilityList />
      <FacilityList />
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
    marginLeft: 10,
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
  topBar: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationDetails: {
    height: 136,
    width: '100%',
    backgroundColor: '#FFF7F0',
    borderRadius: 10,
    marginTop: 40,
    padding: 10,
  },
  location: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationName: {
    color: '#AF6D31',
    marginTop: 20,
  },
});
