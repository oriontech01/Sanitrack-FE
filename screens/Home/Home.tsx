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
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';
import useGetLocation from './hooks/useGetLocation';
import FacilityList from './components/FacilityList';
import HomeCard from './components/HomeCard';
import TimerList from '../Timer/components/TimerList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  ActiveIcon,
  FacilitiesIcon,
  HamburgerMenu,
  LocationIcon,
  PerformanceIcon,
} from '../../assets/svg/Index';
import useGetActiveTask from './hooks/useGetActiveTask';
import useGetAllFacility from './hooks/useGetAllFacility';

export default function Home({ navigation }) {
  const user = useContext(UserContext);
  const [timers, setTimers] = useState([]);
  const [doneTask, setDoneTask] = useState([]);
  const [id, setId] = useState('');
  const [activeData, setActiveData] = useState(null);
  const { locations, loadingLocation } = useGetLocation();
  const { activeTask, loadingActiveTask } = useGetActiveTask();
  const { getAllFacilities, loadingFacilities, facilities } =
    useGetAllFacility();
  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      for (const key of keys) {
        const data = await AsyncStorage.getItem(key);
        const parsedData = JSON.parse(data);
        parsedData.currentTime = Date.now() - parsedData.startTime;
        if (key.startsWith('timerStartTime_')) {
          if (parsedData.userId == user.id) {
            setActiveData(parsedData);
            setTimers((prev) => [...prev, parsedData]);
          }
        }
        if (key.startsWith('done')) {
          if (parsedData.userId == user.id) {
            setDoneTask((prev) => [...prev, parsedData]);
          }
        }
      }
      let interverlId = null;

      if (keys.length > 0) {
        const filteredData = keys.filter((k) =>
          k.startsWith('timerStartTime_')
        );
        if (filteredData.length > 0) {
          if (activeData) {
            interverlId = setInterval(() => {
              setTimers((prev) => {
                const updated = prev.map((item) => {
                  item.currentTime = Date.now() - item.startTime;
                  return {
                    ...item,
                    currentTime: Date.now() - item.startTime,
                  };
                });
                console.log(updated);

                return updated;
                // return updated;
              });
            }, 1000);

            setId(interverlId);
          }
        }
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        setTimers([]);
        clearInterval(id);
        // timers.forEach((timer) => clearInterval(timer.intervalId));
      };
    }, [])
  );

  // useEffect(() => {

  //   fetchData();
  //   // return () => {
  //   //   clearInterval()
  //   //   // timers.forEach((timer) => clearInterval(timer.intervalId));
  //   // };
  // }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          padding: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <HamburgerMenu />
        </TouchableOpacity>
        <AppText style={styles.heading}>Welcome {user.name}</AppText>
      </View>
      <AppText style={styles.heading}>Welcome {user.name}</AppText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        {timers.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppText
              style={{
                color: '#FF4037',
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 20,
              }}>
              Active Timers
            </AppText>

            <TouchableOpacity
              onPress={() => navigation.navigate('CleanerTimer')}
              style={{
                marginRight: 20,
              }}>
              <Text style={{ color: colors.blue }}>All Timers {'>'}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ paddingHorizontal: 20 }}>
          {timers.length > 0 && (
            <>
              {timers.map((timer, ind) => (
                <TimerList active={true} item={timer} key={ind.toString()} />
              ))}
            </>
          )}
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          horizontal
          style={styles.cardsSlider}>
          <HomeCard
            Icon={() => <ActiveIcon />}
            label="NUMBER OF ACTIVE TASK"
            loading={loadingActiveTask}
            value={activeTask}
            color="0, 172, 108"
          />
          <HomeCard
            loading={loadingFacilities}
            color="193, 163, 55"
            Icon={() => <FacilitiesIcon />}
            label="TOTAL FACILITIES ASSIGNED"
            value={facilities}
          />
          <HomeCard
            loading={loadingFacilities || loadingActiveTask}
            color="255, 64, 55"
            Icon={() => <PerformanceIcon />}
            label="TOTAL DONE TASK"
            value={facilities - activeTask}
          />
        </ScrollView>

        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}>
          <AppText
            style={{
              color: colors.blue,
              fontWeight: 'bold',
              marginTop: 20,
            }}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  heading: {
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
