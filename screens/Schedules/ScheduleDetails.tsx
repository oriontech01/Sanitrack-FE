import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';

import {
  ArrowLeftIcon,
  HamburgerMenu,
  LocationIcon,
} from '../../assets/svg/Index';
import useGetTaskSummary from '../Home/hooks/useGetTaskSummary';
import ItemList from '../Home/components/ItemList';
import Button from '../../components/general/Button';

export default function ScheduleDetails({ navigation, route }) {
  const user = useContext(UserContext);
  const { id } = route.params;
  function secondsToHoursMinutes(seconds) {
    var hours = Math.floor(seconds / 3600);
    var remainingSeconds = seconds % 3600;
    var minutes = Math.floor(remainingSeconds / 60);
    return `${hours}hours: ${minutes} minutes`;
  }
  const { summary, loadingSummary } = useGetTaskSummary(id);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          paddingTop: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <AppText style={styles.haeding}>Schedule Details</AppText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        {loadingSummary && (
          <View
            style={{
              height: 200,
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
              Items To Clean
            </Text>
            {summary?.taskDetails?.tasks.length > 0 && (
              <>
                {summary?.taskDetails?.tasks?.map((task, index) => (
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
            {summary?.cleaningItems?.map((item, index) => (
              <ItemList
                key={index.toString()}
                item={item.item_name}
                title={item.quantity}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  haeding: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',

    textTransform: 'capitalize',
    marginLeft: 20,
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
  cardsSlider: {
    maxHeight: 170,
    width: '100%',
    marginVertical: 20,
    minHeight: 170,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
