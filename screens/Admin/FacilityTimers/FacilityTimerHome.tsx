import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import FacilityList from '../../Home/components/FacilityList';
import { HamburgerMenu, LocationIcon } from '../../../assets/svg/Index';

// import useGetLocation from '../../Home/hooks/useGetLocation';
import colors from '../../../util/colors';
import AppText from '../../../components/AppText';
import useLocation from '../../../Hooks/useLocation';

export default function FacilityTimerHome({ navigation }) {
  // const [activeData, setActiveData] = useState(null);
  const { allLocations, getLocation, loading } = useLocation();
  // const { allLocations, loadingLocation } = useGetLocation();
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <ScrollView style={styles.container}>
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
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}
      {!loading && allLocations.length > 0 && (
        <>
          {allLocations.map((location, index) => (
            <FacilityList
              onPress={() =>
                navigation.navigate('AdminMainTimer', {
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

      {!loading && allLocations.length == 0 && (
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
    </ScrollView>
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
