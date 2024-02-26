import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';
import useGetLocation from './hooks/useGetLocation';
import FacilityList from './components/FacilityList';

export default function Home({ navigation }) {
  const user = useContext(UserContext);
  const { locations, loadingLocation } = useGetLocation();
  return (
    <View style={styles.container}>
      <AppText style={styles.haeding}>Welcome {user.name}</AppText>
      <AppText style={styles.subHeader}>
        Below Are The Locations For Today's Task
      </AppText>
      {loadingLocation && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}
      {!loadingLocation && locations.length > 0 && (
        <>
          {locations.map((location, index) => (
            <FacilityList
              onPress={() =>
                navigation.navigate('Facilities', {
                  location: location,
                })
              }
              title={location.city}
              detail={location.state}
              key={index.toString()}
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
