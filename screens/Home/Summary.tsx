import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';
import { ArrowLeftIcon, Location } from '../../assets/svg/Index';
import FacilityList from './components/FacilityList';
import CleaningItemList from './components/CleaningItemList';
import ItemList from './components/ItemList';
import RoomItems from './components/RoomItems';
import TaskDetails from './components/TaskDetails';
import useGetCleaningItems from './hooks/useGetCleaningItems';
import useGetFacilityDetails from './hooks/useGetFacilityDetail';
import useGetTaskSummary from './hooks/useGetTaskSummary';

export default function Summary({ navigation, route }) {
  const { location, facility, cleanerItems, taskId } = route.params;

  const { summary, loadingSummary } = useGetTaskSummary(taskId);
  function secondsToHoursMinutes(seconds) {
    var hours = Math.floor(seconds / 3600);
    var remainingSeconds = seconds % 3600;
    var minutes = Math.floor(remainingSeconds / 60);
    return `${hours}hours: ${minutes} minutes`;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Summary</Text>
      </TouchableOpacity>
      <View style={styles.locationDetails}>
        <View style={styles.location}>
          <Location />
        </View>

        <Text style={{ marginTop: 10 }}>Work Order Addresss</Text>
        <Text style={styles.locationName}>
          {location.city}, {location.state} {location.country}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {loadingSummary && (
          <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}
        {!loadingSummary && summary && (
          <>
            <Text
              style={[
                styles.haeding,
                { marginLeft: 0, marginTop: 20, color: '#000' },
              ]}>
              Planned Time
            </Text>

            <View style={styles.time}>
              <Text style={{ color: colors.blue }}>Clean</Text>
              <Text style={{ color: colors.blue }}>
                {secondsToHoursMinutes(
                  Number(summary.taskDetails.planned_time.clean_time)
                )}
              </Text>
            </View>

            <Text
              style={[
                styles.haeding,
                { marginLeft: 0, marginTop: 20, color: '#000' },
              ]}>
              Items To Clean
            </Text>
            {summary?.taskDetails?.tasks.length > 0 && (
              <>
                {summary.taskDetails.tasks.map((task, index) => (
                  <ItemList key={index.toString()} item={task.name} />
                ))}
              </>
            )}
            <Text
              style={[
                styles.haeding,
                { marginLeft: 0, marginTop: 20, color: '#000' },
              ]}>
              Cleaning Items
            </Text>
            {cleanerItems.map((item, index) => (
              <ItemList
                key={index.toString()}
                item={item.name}
                title={item.quantityReceived}
              />
            ))}
          </>
        )}

        <Button
          onPress={() => {
            navigation.navigate('MainRoom', {
              id: facility.roomId,
              taskId,
              roomName: facility.roomName,
            });
          }}
          style={{ marginTop: 20 }}
          label="Start Timer"
        />
      </ScrollView>
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
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});