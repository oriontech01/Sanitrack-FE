import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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


export default function Home({ navigation }) {
  const user = useContext(UserContext);
  const [timers, setTimers] = useState([]);
  const { locations, loadingLocation } = useGetLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();

        for (const key of keys) {
          const data = await AsyncStorage.getItem(key);
          setTimers((prev) => [...prev, JSON.parse(data)]);
          console.log(timers);
        }

        // if (keys.length) {
        //   const data = await AsyncStorage.getItem(doneKeys[0]);
        //   setDoneTask(JSON.parse(data).endTime);
        // } else {
        //   const timerKeys = keys.filter((key) =>
        //     key.startsWith('timerStartTime_')
        //   );
        //   for (const timerKey of timerKeys) {
        //     const values = await AsyncStorage.getItem(timerKey);
        //     const timerId = timerKey.split('_')[1];
        //     const startTime = parseInt(JSON.parse(values).start);

        //     const currentTime = new Date().getTime() - startTime;
        //     console.log(startTime, values, currentTime, 'new');
        //     if (JSON.parse(values).id == id) {
        //       setStartedTime(startTime);
        //       setSeconds(new Date().getTime() - startTime);
        //       setIsActive(true);
        //     }
        //   }
        // }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
    return () => {
      timers.forEach((timer) => clearInterval(timer.intervalId));
    };
  }, []);
  return (
    <View style={styles.container}>
      <AppText style={styles.heading}>Welcome {user.name}</AppText>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <AppText
          style={{
            color: colors.darkblue,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Active Timers
        </AppText>
        {timers.length > 0 && (
          <>
            {timers.map((timer, ind) => (
              <TimerList item={timer} key={ind.toString()} />
            ))}
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <HomeCard />
          <HomeCard />
        </View>

        <AppText style={styles.subHeader}>
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
      </ScrollView>
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
  heading: {
    color: colors.blue,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
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
});
