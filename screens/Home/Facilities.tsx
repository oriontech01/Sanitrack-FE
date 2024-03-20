import {
  ActivityIndicator,
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
import useGetFacilities from './hooks/useGetFacilities';

export default function Facilities({ navigation, route }) {
  const { location } = route.params;
  const { getFacilities, facilityList, loadingFacilities } = useGetFacilities(
    location.id
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Rooms</Text>
      </TouchableOpacity>
      <View style={styles.locationDetails}>
        <View style={styles.location}>
          <Location />
        </View>

        <Text style={{ marginTop: 10 }}>Work Order Address</Text>
        <Text style={styles.locationName}>
          {location.state}, {location.city} {location.country}
        </Text>
      </View>

      {loadingFacilities && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}

      {!loadingFacilities && facilityList.length > 0 && (
        <>
          <Text style={[styles.haeding, { marginLeft: 0, marginTop: 20 }]}>
            Rooms List
          </Text>

          {facilityList.map((facility, index) => (
            <FacilityList
              key={index.toString()}
              title={facility.roomName}
              detail={location.city}
              onPress={() => {
                navigation.navigate('Rooms', {
                  location,
                  facility,
                  taskId: facility.taskId,
                  cleaner_time: facility.cleaner_time
                    ? facility.cleaner_time[0]
                    : null,
                });
              }}
            />
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
