import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FacilityList from '../Home/components/FacilityList';
import { HamburgerMenu, LocationIcon } from '../../assets/svg/Index';
import useGetAllFacility from '../Home/hooks/useGetAllFacility';
import useGetLocation from '../Home/hooks/useGetLocation';
import colors from '../../util/colors';
import AppText from '../../components/AppText';

export default function FacilityTimerHome({ navigation }) {
  // const [activeData, setActiveData] = useState(null);
  const { locations, loadingLocation } = useGetLocation();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <HamburgerMenu />
        </TouchableOpacity>
        <AppText style={styles.haeding}>Facilities</AppText>
      </View>
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

      {!loadingLocation && locations.length == 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            height: 400,
          }}>
          <LocationIcon />
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            No Task Allocatd To You For Now!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  haeding: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    textTransform: 'capitalize',
  },
});
