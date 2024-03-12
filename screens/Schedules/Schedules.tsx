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

import { HamburgerMenu, LocationIcon } from '../../assets/svg/Index';

import FacilityList from '../Home/components/FacilityList';
import moment from 'moment';
import useGetTaksHistory from '../Home/hooks/useGetTaskHistory';

export default function Schedules({ navigation }) {
  const user = useContext(UserContext);
  const { history, loadingHistory } = useGetTaksHistory();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          paddingTop: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <HamburgerMenu />
        </TouchableOpacity>
        <AppText style={styles.haeding}>Schedules</AppText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        {loadingHistory && (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}

        {!loadingHistory && history.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              height: 400,
            }}>
            <LocationIcon />
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              No Task Allocatd To You!
            </Text>
          </View>
        )}

        {!loadingHistory && history.length > 0 && (
          <>
            {history.map((location, index) => (
              <FacilityList
                onPress={() => {
                  navigation.navigate('ScheduleDetail', {
                    id: location._id,
                  });
                }}
                title={'Task Stage'}
                detail={location.task_stage}
                key={index.toString()}
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
});
