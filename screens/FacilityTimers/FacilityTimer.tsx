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
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';
import { ArrowLeftIcon, PlayIcon, StopIcon } from '../../assets/svg/Index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Camera, CameraType } from 'expo-camera';
import FacilityList from '../Home/components/FacilityList';
import useGetDetails from './hooks/useGetDetails';
import Timer from './components/Timer';
import useGetStages from './hooks/useGetStages';
import moment from 'moment';
import useReleaseFacility from './hooks/useReleaseFacility';

export default function FacilityTimer({ navigation, route }) {
  const { facility, id } = route.params;
  const { id: staffId } = useContext(UserContext);
  const parsedFacility = JSON.parse(facility);
  const { facilities } = useGetDetails(id);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [doneTask, setDoneTask] = useState(undefined);
  const [startedTime, setStartedTime] = useState([]);
  const [selectedItem, setSelectedItem] = useState(
    parsedFacility.stages[0].name
  );
  const { releaseFacility, releasing } = useReleaseFacility();
  const [selectedValue, setSelectedValue] = useState({
    value: parsedFacility.stages[0]._id,
    label: parsedFacility.stages[0].name,
  });
  const [fileInputs, setFileInputs] = useState([]);
  const { stages, loadingStages, refetch } = useGetStages(id);
  //   const { cleaningItems,task } = useGetCleaningItems(id);

  //   TIMER LOGIC----------------------------------------------------------------
  const [timers, setTimers] = useState([]);

  const startTimer = async () => {
    const startTime = Date.now();
    const timerId = startTime.toString();
    await AsyncStorage.setItem(
      `facilityStartTime_${selectedValue.value}_${timerId}`,
      JSON.stringify({
        startTime: startTime.toString(),
        id: `${selectedValue.value}_${id}`,
        facility_id: id,
        userId: staffId,
      })
    );
    setStartedTime((prev) => [
      ...prev,
      { startTime, id: `facilityStartTime_${selectedValue.value}_${timerId}` },
    ]);
    setIsActive(true);
  };

  const stopTimer = async (timerId) => {
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(updatedTimers);
    clearInterval(timerId);
    await AsyncStorage.removeItem(`timerStartTime_${timerId}`);
  };
  const fetchData = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const doneKeys = keys
        .filter((key) => key.startsWith('facility_done_'))
        .filter((key) => {
          const roomId = key.split('_')[1];
          return roomId == id;
        });

      if (doneKeys.length) {
        const data = await AsyncStorage.getItem(doneKeys[0]);
        setDoneTask(JSON.parse(data).endTime);
      } else {
        const timerKeys = keys.filter((key) =>
          key.startsWith('facilityStartTime_')
        );
        for (const timerKey of timerKeys) {
          const values = await AsyncStorage.getItem(timerKey);
          const timerId = timerKey.split('_')[2];
          const startTime = parseInt(JSON.parse(values).startTime);

          const currentTime = Date.now() - startTime;

          if (JSON.parse(values).id == `${selectedValue.value}_${id}`) {
            setStartedTime((prev) => [
              ...prev,
              {
                startTime,
                id: `facilityStartTime_${selectedValue.value}_${timerId}`,
              },
            ]);
            setSeconds(Date.now() - startTime);
            setIsActive(true);
          } else {
            setStartedTime([]);
          }
        }
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  }, [selectedValue]);
  useEffect(() => {
    fetchData();
    // return () => {
    //   timers.forEach((timer) => clearInterval(timer.intervalId));
    // };
  }, [fetchData]);

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
    const filtered = startedTime.filter(
      (time) => time.id == `${selectedValue.value}_${id}`
    );
    if (filtered.length == 0) {
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
    const filtered = startedTime.filter(
      (time) => time.id == `${selectedValue.value}_${id}`
    );
    if (filtered.length !== 0 && isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => Date.now() - filtered[0].startedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>
          {parsedFacility.facility_id.facility_name}
        </Text>
      </TouchableOpacity>
      <Text style={{ marginVertical: 20, fontWeight: 'bold' }}>
        Scheduled Date:{' '}
        {moment(parsedFacility.scheduled_date).format('YYYY-MM-DD')}
      </Text>
      <Select
        initialValue={{
          value: parsedFacility.stages[0]._id,
          label: parsedFacility.stages[0].name,
        }}
        label={selectedValue.label}
        options={parsedFacility.stages.map((stage) => {
          return {
            value: stage._id,
            label: stage.name,
          };
        })}
        onSelect={(e) => {
          setSelectedItem(e.label);
          setSelectedValue(e);
        }}
      />
      <Timer
        stages={stages}
        loadingStages={loadingStages}
        refetch={refetch}
        selected={selectedItem}
        id={id}
        startedTime={startedTime}
      />
      <Text
        style={{
          fontWeight: 'bold',
          color: colors.blue,
          fontSize: 16,
        }}>
        Stages
      </Text>
      {stages.map((stage, ind) => (
        <TouchableOpacity
          key={ind}
          activeOpacity={0.8}
          onPress={() => {
            console.log(stage);
          }}
          style={[
            styles.container3,
            {
              borderWidth: 1,
              borderColor:
                stage.actual_stage_start_time == null
                  ? 'red'
                  : stage.actual_stage_stop_time == null
                  ? 'red'
                  : 'green',
            },
          ]}>
          <View style={{ width: '80%' }}>
            <Text style={{ color: colors.blue, marginBottom: 5 }}>
              {stage.name}
            </Text>
            <Text>
              Planned Time: {moment(stage.planned_start_time).format('HH:mm')}
            </Text>
          </View>

          <View>
            <Text>
              {stage.actual_stage_start_time == null
                ? 'Pending'
                : stage.actual_stage_stop_time == null
                ? 'Pending'
                : 'Done'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      <View
        style={[
          styles.buttons,
          { justifyContent: 'space-between', paddingBottom: 25 },
        ]}>
        <Button
          isLoading={releasing}
          onPress={async () => {
            const released = await releaseFacility(id);
            if (released) {
              alert('Successfully Released Facility');
              navigation.navigate('FacilityHome');
            }
          }}
          style={styles.submit}
          label="Release Facility"
        />
      </View>
    </ScrollView>
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
    width: '100%',
  },
  container3: {
    height: 69,
    width: '100%',
    backgroundColor: '#EBF0FF',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
