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

import { HamburgerMenu } from '../../assets/svg/Index';
import useGetRequestCleaningItems from './hooks/useGetRequestCleaningItems';
import FacilityList from '../Home/components/FacilityList';
import moment from 'moment';

export default function RequestHome({ navigation }) {
  const user = useContext(UserContext);

  const { useGetItems, items, loadingItems } = useGetRequestCleaningItems();
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
        <AppText style={styles.haeding}>Requests</AppText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        {loadingItems && (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}
        {!loadingItems && items.length > 0 && (
          <>
            {items
              .filter((item) => item !== 'No request')
              .map((data, index) => (
                <FacilityList
                  key={index.toString()}
                  detail={moment(data.task.date_added).format('DD-MM-YYYY')}
                  title={data.task.assigned_room.roomName}
                  onPress={() => {
                    navigation.navigate('RequestDetail', {
                      id: data.task._id,
                    });
                  }}
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
