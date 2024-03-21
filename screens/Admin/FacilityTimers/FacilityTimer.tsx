import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import colors from '../../../util/colors';

import Button from '../../../components/general/Button';
import { ArrowLeftIcon, PlayIcon, StopIcon } from '../../../assets/svg/Index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Camera, CameraType } from 'expo-camera';

export default function FacilityTimer({ navigation, route }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [doneTask, setDoneTask] = useState(undefined);
  const [startedTime, setStartedTime] = useState(0);

  const [fileInputs, setFileInputs] = useState([]);
  //   const { cleaningItems,task } = useGetCleaningItems(id);

  //   TIMER LOGIC----------------------------------------------------------------
  const [timers, setTimers] = useState([]);

  const startTimer = async () => {
    const startTime = Date.now();
    const timerId = startTime.toString();
    //   await AsyncStorage.setItem(
    //     `timerStartTime_${timerId}`,
    //     JSON.stringify({
    //       startTime: startTime.toString(),
    //       id: id,
    //       taskId,
    //       taskName: roomName,
    //       userId: staffId,
    //     })
    //   );
    setStartedTime(startTime);
    setIsActive(true);
  };

  const stopTimer = async (timerId) => {
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(updatedTimers);
    clearInterval(timerId);
    await AsyncStorage.removeItem(`timerStartTime_${timerId}`);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const keys = await AsyncStorage.getAllKeys();

  //       const doneKeys = keys
  //         .filter((key) => key.startsWith('done_'))
  //         .filter((key) => {
  //           const roomId = key.split('_')[1];
  //           return roomId == id;
  //         });

  //       if (doneKeys.length) {
  //         const data = await AsyncStorage.getItem(doneKeys[0]);
  //         setDoneTask(JSON.parse(data).endTime);
  //       } else {
  //         const timerKeys = keys.filter((key) =>
  //           key.startsWith('timerStartTime_')
  //         );
  //         for (const timerKey of timerKeys) {
  //           const values = await AsyncStorage.getItem(timerKey);
  //           const timerId = timerKey.split('_')[1];
  //           const startTime = parseInt(JSON.parse(values).startTime);

  //           const currentTime = Date.now() - startTime;
  //           console.log(startTime, values, currentTime, 'new');
  //           if (JSON.parse(values).id == id) {
  //             setStartedTime(startTime);
  //             setSeconds(Date.now() - startTime);
  //             setIsActive(true);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.log('Error retrieving data:', error);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //     timers.forEach((timer) => clearInterval(timer.intervalId));
  //   };
  // }, []);

  //   ENF OF TIMER LOGIC----------------------------------------------------------------

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatTimer = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const remainingMinutes = Math.floor((milliseconds % 3600000) / 60000);
    const remainingSeconds = ((milliseconds % 60000) / 1000).toFixed(0);

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes =
      remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    const formattedSeconds =
      Number(remainingSeconds) < 10
        ? `0${remainingSeconds}`
        : `${remainingSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const handleStart = async () => {
    if (startedTime == 0) {
      startTimer();
      return;
    }
  };

  // const handleStop = async () => {
  //   if (startedTime !== 0) {
  //     await AsyncStorage.removeItem(`timerStartTime_${startedTime}`);
  //     await AsyncStorage.setItem(
  //       `done_${id}`,
  //       JSON.stringify({
  //         startTime: startedTime,
  //         endTime: Date.now() - startedTime,
  //       })
  //     );
  //     setDoneTask(Date.now() - startedTime);
  //     setIsActive(false);
  //     setStartedTime(0);
  //   }
  // };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };
  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    if (cameraPermission.status !== 'granted') {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  useEffect(() => {
    let interval = null;
    if (startedTime > 0 && isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => new Date().getTime() - startedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Cleaner Timer</Text>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedCircularProgress
          style={{
            width: '100%',

            marginTop: 40,

            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
          size={200}
          width={5}
          fill={0}
          tintColor={colors.blue}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#E0E8FF"></AnimatedCircularProgress>
        <Text
          style={{
            color: '#000',
            position: 'absolute',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {startedTime !== 0
            ? `${formatTimer(seconds)}  Sec`
            : doneTask
            ? formatTimer(doneTask)
            : '0:00 Sec'}
        </Text>
      </View>

      {!doneTask && (
        <View style={styles.buttons}>
          <View>
            <TouchableOpacity
              onPress={handleStart}
              style={[styles.button, { opacity: startedTime == 0 ? 1 : 0.4 }]}>
              <PlayIcon />
            </TouchableOpacity>

            <Text style={{ color: colors.blue, marginTop: 10 }}>
              Start Timer
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FFE0E0' }]}>
              <StopIcon />
            </TouchableOpacity>

            <Text style={{ color: '#6D0808', marginTop: 10 }}>Stop Timer</Text>
          </View>
        </View>
      )}
      {doneTask ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#075039df',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{ fontWeight: 'bold', color: '#fff' }}>
            Task Done in {formatTimer(doneTask)} Sec
          </Text>
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, minHeight: 180 }}>
        <Text>Coming sooon!</Text>
        {/* {loadingDetails && (
            <View
              style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color={colors.blue} />
            </View>
          )} */}
      </ScrollView>

      <View style={[styles.buttons, { justifyContent: 'space-between' }]}>
        <Button
          onPress={async () => {}}
          style={styles.submit}
          label="Submit Task"
        />
        <Button
          onPress={() => {
            navigation.navigate('HomeIndex');
          }}
          fontStyle={{ color: colors.blue }}
          style={{ ...styles.submit, backgroundColor: '#E0E8FF' }}
          label="Next Task"
        />
      </View>
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
  buttons: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: 56,
    backgroundColor: '#E0E8FF',
    height: 56,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: '45%',
  },
});
