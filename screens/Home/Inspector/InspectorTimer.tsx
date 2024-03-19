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
  Modal,
  Dimensions,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import AppText from '../../../components/AppText';
import colors from '../../../util/colors';
import Select from '../../../components/general/Select';
import Button from '../../../components/general/Button';
import { ArrowLeftIcon, PlayIcon, StopIcon } from '../../../assets/svg/Index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RoomItems from '../components/RoomItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetCleaningItems from '../hooks/useGetCleaningItems';
import { Camera, CameraType } from 'expo-camera';
import useGetFacilityDetails from '../hooks/useGetFacilityDetail';
import useStartTime from '../hooks/useStartTime';
import useGetCleanerWork from '../hooks/useGetCleanerWork';
import InspectorRoomItems from './components/InspectorRoomItems';
import useApproveTask from '../hooks/useApproveTask';

export default function InspectorTimer({ navigation, route }) {
  const { id, taskId, roomName } = route.params;
  const { id: staffId } = useContext(UserContext);
  const [seconds, setSeconds] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [startedTime, setStartedTime] = useState(0);
  const [doneTask, setDoneTask] = useState(undefined);
  const { saveStartTimer, confirming } = useStartTime();
  //   const { cleaningItems,task } = useGetCleaningItems(id);
  //   const { detailList, loadingDetails } = useGetCleanerWork(id);
  const { loadingDetails, task } = useGetFacilityDetails(taskId);
  const { approveTask, approving } = useApproveTask();
  //   TIMER LOGIC----------------------------------------------------------------
  const [timers, setTimers] = useState([]);

  const startTimer = async () => {
    const startTime = Date.now();
    const timerId = startTime.toString();
    await AsyncStorage.setItem(
      `timerStartTime_${timerId}`,
      JSON.stringify({
        startTime: startTime.toString(),
        id: id,
        taskId,
        taskName: roomName,
        userId: staffId,
      })
    );
    setStartedTime(startTime);
    setIsActive(true);
  };

  const stopTimer = async (timerId) => {
    const updatedTimers = timers.filter((timer) => timer.id !== timerId);
    setTimers(updatedTimers);
    clearInterval(timerId);
    await AsyncStorage.removeItem(`timerStartTime_${timerId}`);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();

        const doneKeys = keys
          .filter((key) => key.startsWith('done_'))
          .filter((key) => {
            const roomId = key.split('_')[1];
            return roomId == id;
          });

        if (doneKeys.length) {
          const data = await AsyncStorage.getItem(doneKeys[0]);
          setDoneTask(JSON.parse(data).endTime);
        } else {
          const timerKeys = keys.filter((key) =>
            key.startsWith('timerStartTime_')
          );
          for (const timerKey of timerKeys) {
            const values = await AsyncStorage.getItem(timerKey);
            const timerId = timerKey.split('_')[1];
            const startTime = parseInt(JSON.parse(values).startTime);

            const currentTime = Date.now() - startTime;
            console.log(startTime, values, currentTime, 'new');
            if (JSON.parse(values).id == id) {
              setStartedTime(startTime);
              setSeconds(Date.now() - startTime);
              setIsActive(true);
            }
          }
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
    return () => {
      timers.forEach((timer) => clearInterval(timer.intervalId));
    };
  }, []);

  const noEvidence = task.filter((t) => t.image_url !== 'empty');
  //   ENF OF TIMER LOGIC----------------------------------------------------------------

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStart = async () => {
    if (noEvidence.length == 0) {
      alert('All task are not submited');
      return;
    }
    if (startedTime == 0) {
      await saveStartTimer(id, taskId);
      startTimer();
      return;
    }
  };

  const handleStop = async () => {
    if (startedTime !== 0) {
      await AsyncStorage.removeItem(`timerStartTime_${startedTime.toString()}`);
      await AsyncStorage.setItem(
        `done_${id}`,
        JSON.stringify({
          startTime: startedTime,
          endTime: new Date().getTime() - startedTime,
        })
      );
      setDoneTask(new Date().getTime() - startedTime);
      setIsActive(false);
      setStartedTime(0);
    }
  };

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
        <Text style={styles.haeding}>Inspector Timer</Text>
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
              onPress={handleStop}
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

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {loadingDetails && (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}

        {!loadingDetails && (
          <>
            {task.map((det, ind) => (
              <InspectorRoomItems
                done={doneTask}
                startTime={startedTime}
                item={det}
                key={ind.toString()}
              />
            ))}
          </>
        )}
      </ScrollView>

      <View style={[styles.buttons, { justifyContent: 'space-between' }]}>
        <Button
          onPress={() => {
            if (startedTime == 0) {
              alert('Please Start Your Timer');
              return;
            }
            setModalVisible(true);
          }}
          fontStyle={{ color: colors.blue }}
          style={{ ...styles.submit, backgroundColor: '#E0E8FF' }}
          label="View All Images"
        />
        <Button
          isLoading={approving}
          onPress={async () => {
            const approvedlist = task.filter((t) => t.satisfied == true);

            if (doneTask) {
              if (approvedlist.length > 0) {
                const bodyData = {
                  timer: Math.floor(Number(doneTask) / 1000),
                  passedTasks: approvedlist.map((t) => {
                    return {
                      taskId: t.task_id,
                    };
                  }),
                };
                const approved = await approveTask(bodyData, taskId);

                if (approved) {
                  await AsyncStorage.removeItem(`done_${id}`);
                  if (approvedlist.length == task.length) {
                    navigation.navigate('CloseOrder', {
                      id: taskId,
                    });
                  } else {
                    navigation.navigate('Success');
                  }
                }
              } else {
                alert('At Least one task must be approved');
              }
            } else {
              alert('Please Stop Your Timer before Submiting');
            }
          }}
          style={styles.submit}
          label="Approve Tasks"
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.cameraModal}>
          <View style={styles.mainCamera}>
            {task
              .filter((task) => task.image_url !== 'empty')
              .map((oneTask, ind) => (
                <View key={oneTask.image_url}>
                  {ind == active && (
                    <Image
                      resizeMode="cover"
                      source={{ uri: oneTask.image_url }}
                      style={{
                        height: Dimensions.get('window').height - 350,
                        width: '100%',
                      }}
                    />
                  )}
                </View>
              ))}

            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 20,
                  marginVertical: 10,
                }}>
                {active + 1} of
                {task.filter((task) => task.image_url !== 'empty').length}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Button
                  style={{ width: '45%' }}
                  onPress={() => {
                    if (
                      active ==
                      task.filter((task) => task.image_url !== 'empty').length -
                        1
                    ) {
                      setActive(0);
                    } else {
                      setActive((prev) => prev + 1);
                    }
                  }}
                  label="Next"
                />
                <Button
                  style={{ width: '45%', backgroundColor: '#6D0808' }}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  label="Close"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: StatusBar.currentHeight,
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
  cameraModal: {
    height: Dimensions.get('window').height,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainCamera: {
    width: '100%',
    height: Dimensions.get('window').height - 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    marginTop: 'auto',
    padding: 20,
  },
});
