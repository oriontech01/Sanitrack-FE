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
import useGetFacilities from './hooks/useGetFacilities';

export default function FacilityTimerHome({ navigation }) {
  // const [activeData, setActiveData] = useState(null);

  const { facilities, loadingFacilities } = useGetFacilities();

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
      {!loadingFacilities && facilities.length > 0 && (
        <>
          {facilities.map((facility, index) => {
            if (
              !facility?.facility_id?.facility_name ||
              !facility?.facility_id?.city
            ) {
              return null;
            }
            return (
              <FacilityList
                onPress={() =>
                  navigation.navigate('FacilityMainTimer', {
                    facility: JSON.stringify(facility),
                    id: facility._id,
                  })
                }
                title={facility?.facility_id?.facility_name || 'Unavailable'}
                detail={facility?.facility_id?.city || 'Unavailable'}
                key={index.toString()}
              />
            );
          })}
        </>
      )}

      {!loadingFacilities && facilities.length == 0 && (
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
