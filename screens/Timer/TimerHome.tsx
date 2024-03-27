import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import colors from '../../util/colors';
import TimerList from './components/TimerList';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetLocation from '../Home/hooks/useGetLocation';
import AppText from '../../components/AppText';
import { LocationIcon } from '../../assets/svg/Index';
import { UserContext } from '../../context/UserContext';
import Button from '../../components/general/Button';
export default function TimerHome({ navigation }) {
  const [timers, setTimers] = useState([]);
  const [id, setId] = useState('');
  const [doneTask, setDoneTask] = useState([]);
  const { id: staffId, role } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let activeData = null;
      for (const key of keys) {
        const data = await AsyncStorage.getItem(key);
        const parsedData = JSON.parse(data);
        parsedData.currentTime = Date.now() - parsedData.startTime;
        if (key.startsWith('timerStartTime_')) {
          if (parsedData.userId == staffId) {
            activeData = parsedData;
            setTimers((prev) => [...prev, parsedData]);
          }
        }
        if (key.startsWith('done')) {
          if (parsedData.userId == staffId) {
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
        setDoneTask([]);
        clearInterval(id);
        // timers.forEach((timer) => clearInterval(timer.intervalId));
      };
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate('FacilityTimer');
        }}
        style={{
          marginLeft: 'auto',
          width: '40%',
          marginRight: 20,
        }}
        label="Facility Timers>"
      />

      {timers.length > 0 && (
        <AppText
          style={{
            color: '#FF4037',
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Active Timers
        </AppText>
      )}
      {timers.length > 0 && (
        <>
          {timers.map((timer, ind) => (
            <TimerList active={true} item={timer} key={ind.toString()} />
          ))}
        </>
      )}
      {timers.length == 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            height: 300,
          }}>
          <LocationIcon />
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            No Active Timers For Now!
          </Text>
        </View>
      )}
      <View style={styles.label}>
        <Text style={{ color: '#809997' }}>Previous Timers</Text>
      </View>
      {doneTask.length > 0 && (
        <>
          {doneTask.map((timer, ind) => (
            <TimerList active={false} item={timer} key={ind.toString()} />
          ))}
        </>
      )}

      <Text style={styles.header}>Timer</Text>
      {/* <TimerList />
      <TimerList />
      <TimerList /> */}
      <View style={styles.label}>
        <Text style={{ color: '#809997' }}>Yesterday</Text>
      </View>

      {/* <TimerList />
      <TimerList /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  header: {
    color: colors.blue,
    fontSize: 19,
    marginTop: 20,
    fontWeight: 'bold',
  },
  label: {
    width: '100%',
    padding: 5,
    backgroundColor: '#F5F5F5',
    marginTop: 20,
  },
});
