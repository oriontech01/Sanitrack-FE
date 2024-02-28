import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import AppText from '../../../components/AppText';
import colors from '../../../util/colors';
import Select from '../../../components/general/Select';
import Button from '../../../components/general/Button';
import {
  ArrowLeftIcon,
  EyeScan,
  Location,
  QrCode,
} from '../../../assets/svg/Index';
import FacilityList from '../components/FacilityList';
import ItemList from '../components/ItemList';
import useGetFacilityDetails from '../hooks/useGetFacilityDetail';

export default function InspectorItemsToClean({ navigation, route }) {
  const { params } = route.params;
  const parsedParams = JSON.parse(params);
  const { location, facility, id } = parsedParams;
  const { loadingDetails, task, taskId } = useGetFacilityDetails(id);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Facility Details</Text>
      </TouchableOpacity>

      {loadingDetails && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}

      {!loadingDetails && task.length > 0 && (
        <>
          <Text style={{ color: '#999999', marginVertical: 10, fontSize: 12 }}>
            Facilities to clean {`(${task.length})`}
          </Text>
          {task.map((detail, index) => (
            <ItemList key={index.toString()} item={detail.name} />
          ))}
        </>
      )}

      <Button
        onPress={() =>
          navigation.navigate('InspectorTimer', {
            location,
            facility,
            taskId,
            id: facility.roomId,
            roomName: facility.roomName,
          })
        }
        style={{
          marginTop: 'auto',
          marginBottom: 30,
        }}
        label="Next"
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
