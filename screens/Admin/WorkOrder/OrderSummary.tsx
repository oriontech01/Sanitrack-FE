import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';

import colors from '../../../util/colors';

import Button from '../../../components/general/Button';
import { ArrowLeftIcon } from '../../../assets/svg/Index';

import moment from 'moment';
import useGetTaskSummary from '../../Home/hooks/useGetTaskSummary';
import useGetFacilityDetails from '../../Home/hooks/useGetFacilityDetail';
import ItemList from '../../Home/components/ItemList';
import CleaningItemList from '../../Home/components/CleaningItemList';

export default function OrderSummary({ navigation, route }) {
  const { id, taskId } = route.params;

  // const { location, facility, id, taskId, cleaner_time } = parsedParams;
  const { summary, loadingSummary } = useGetTaskSummary(taskId);
  const { loadingDetails, task } = useGetFacilityDetails(id);
  function secondsToHoursMinutes(seconds) {
    var hours = Math.floor(seconds / 3600);
    var remainingSeconds = seconds % 3600;
    var minutes = Math.floor(remainingSeconds / 60);
    return `${hours} hours:${minutes}  minutes`;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Order Details</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {(loadingDetails || loadingSummary) && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}

        {!loadingDetails && task.length > 0 && (
          <>
            <Text
              style={{
                color: '#999999',
                marginVertical: 10,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Facilities to clean {`(${task.length})`}
            </Text>
            {task.map((detail, index) => (
              <ItemList key={index.toString()} item={detail.name} />
            ))}
          </>
        )}
        {!loadingSummary && (
          <View>
            <Text
              style={{
                color: '#999999',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Cleaning Items {`(${summary?.cleaningItems?.length})`}
            </Text>
            {summary?.cleaningItems?.map((item, ind) => (
              <CleaningItemList inspector item={item} key={ind.toString()} />
            ))}
          </View>
        )}

        {!loadingSummary && (
          <View>
            <Text
              style={{
                color: '#999999',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Date Assigned
            </Text>
            <Text style={{ color: colors.blue }}>
              {moment(summary?.taskDetails?.date_added).format('DD-MM-YYYY')}
            </Text>
          </View>
        )}

        {!loadingSummary && (
          <View>
            <Text
              style={{
                color: '#999999',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Planned Time
            </Text>
            <Text style={{ color: colors.blue }}>
              {/* {secondsToHoursMinutes(
                  (Date.now() - new Date(cleaner_time).getMilliseconds()) / 1000
                )} */}
              {secondsToHoursMinutes(
                Number(summary?.taskDetails?.planned_time?.clean_time)
              )}
            </Text>
          </View>
        )}

        {!loadingSummary && (
          <View>
            <Text
              style={{
                color: '#999999',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Assigned Cleaner
            </Text>
            <Text style={{ color: colors.blue }}>
              {summary?.taskDetails?.assigned_cleaner?.[0].username}
            </Text>
          </View>
        )}

        <Button
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginTop: 20,
            marginBottom: 30,
          }}
          label="Back"
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
