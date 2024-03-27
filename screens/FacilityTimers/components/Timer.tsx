import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import colors from '../../../util/colors';
import { PlayIcon, StopIcon } from '../../../assets/svg/Index';
import useGetStages from '../hooks/useGetStages';
import useStartTime from '../hooks/useStartTime';
import useStopTime from '../hooks/useStopTimer';
import moment from 'moment';

export default function Timer({
  startedTime,
  doneTask = false,
  id,
  selected,
  stages,
  loadingStages,
  refetch,
}) {
  const [stoped, setStoped] = useState(0);
  const { saveStartTimer, confirming } = useStartTime();
  const { stopTime, confirming: stopping } = useStopTime();
  const [myInterval, setMyInterval] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(0);
  const formatTimer = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const remainingMinutes = Math.floor((milliseconds % 3600000) / 60000);
    const remainingSeconds = ((milliseconds % 60000) / 1000).toFixed(0);

    const formattedHours = hours < 10 ? `${hours}` : `${hours}`;
    const formattedMinutes =
      remainingMinutes < 10 ? `${remainingMinutes}` : `${remainingMinutes}`;
    const formattedSeconds =
      Number(remainingSeconds) < 10
        ? `${remainingSeconds}`
        : `${remainingSeconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleStart = async () => {
    const filtered = stages.filter((stage) => stage.name == selected);

    if (filtered[0].actual_stage_start_time == null) {
      if (filtered.length > 0) {
        const saved = await saveStartTimer(filtered[0].name, id);
        await refetch();
        setStarted(Date.now());

        //   if (filtered[0].actual_stage_start_time) {

        //   }
      }
    } else {
      alert('Already Started');
    }

    // const filtered = startedTime.filter(
    //   (time) => time.id == `${selectedValue.value}_${id}`
    // );
    // if (filtered.length == 0) {
    //   startTimer();
    //   return;
    // }
  };
  const startTime = () => {
    // Clear the previous interval
    // clearInterval(myInterval);

    // Start a new interval
    const current = setInterval(() => {
      setSeconds((prev) => Date.now() - Number(started));
    }, 1000);

    // Save the interval ID
  };

  useEffect(() => {
    setSeconds(0);
    setStarted(0);
    const filtered = stages.filter((stage) => stage.name == selected);

    if (filtered.length > 0 && filtered[0].actual_stage_start_time !== null) {
      const myDate = Date.parse(filtered[0].actual_stage_start_time);
      if (filtered[0].actual_stage_stop_time !== null) {
        const stoped = Date.parse(filtered[0].actual_stage_stop_time);
        setStoped(stoped - myDate);
        setStarted(0);
        return;
      }
      setStoped(0);
      setStarted(Number(myDate));
    } else {
      console.log('setf');
      setStoped(0);
      setStarted(0);
      setSeconds(0);
    }

    // return () => {
    //   // Clear the interval when the component unmounts or when the dependency changes
    //   clearInterval(myInterval);
    // };
  }, [selected, started, stages]);

  //   useEffect(() => {
  //     if (started !== 0) {
  //       startTime();
  //     } // Start the timer when 'started' is set
  //   }, [started, selected]);
  //   useEffect(() => {
  //     refetch();
  //   }, [selected]);
  const filtered = stages.filter((stage) => stage.name == selected);
  return (
    <>
      {loadingStages && (
        <View
          style={{
            height: 200,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}
      {!loadingStages && (
        <>
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
            <View style={{ position: 'absolute' }}>
              <Text
                style={{
                  color: '#901616',

                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                {/* {stoped !== 0 ? formatTimer(stoped) : formatTimer(seconds)} */}
                {filtered.length > 0 &&
                  filtered[0].actual_stage_start_time == null &&
                  `Not Started`}
              </Text>

              <Text
                style={{
                  color: '#000',

                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                {/* {stoped !== 0 ? formatTimer(stoped) : formatTimer(seconds)} */}
                {filtered.length > 0 &&
                  filtered[0].actual_stage_start_time !== null &&
                  ` Started At:` +
                    moment(filtered[0].actual_stage_start_time).format('hh:mm')}
              </Text>

              <Text
                style={{
                  color: '#000',

                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                {/* {stoped !== 0 ? formatTimer(stoped) : formatTimer(seconds)} */}
                {filtered.length > 0 &&
                  filtered[0].actual_stage_stop_time !== null &&
                  `Stopped At:` +
                    moment(filtered[0].actual_stage_stop_time).format('hh:mm')}
              </Text>
            </View>
          </View>

          {stoped == 0 && (
            <View style={styles.buttons}>
              <View>
                {confirming && <ActivityIndicator color={colors.blue} />}
                {!confirming && (
                  <>
                    <TouchableOpacity
                      onPress={handleStart}
                      style={[
                        styles.button,
                        { opacity: startedTime.length == 0 ? 1 : 0.4 },
                      ]}>
                      <PlayIcon />
                    </TouchableOpacity>

                    <Text style={{ color: colors.blue, marginTop: 10 }}>
                      Start Timer
                    </Text>
                  </>
                )}
              </View>

              <View>
                {stopping && <ActivityIndicator color={colors.blue} />}
                {!stopping && (
                  <>
                    <TouchableOpacity
                      onPress={async () => {
                        const filtered = stages.filter(
                          (stage) => stage.name === selected
                        );
                        await stopTime(filtered[0].name, id, filtered[0]._id);
                        await refetch();
                        setStoped(
                          Date.now() -
                            Number(filtered[0].actual_stage_start_time)
                        );
                      }}
                      style={[styles.button, { backgroundColor: '#FFE0E0' }]}>
                      <StopIcon />
                    </TouchableOpacity>

                    <Text style={{ color: '#6D0808', marginTop: 10 }}>
                      Stop Timer
                    </Text>
                  </>
                )}
              </View>
            </View>
          )}
          {stoped !== 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#075039df',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                Task Done in {formatTimer(stoped)} Sec
              </Text>
            </View>
          ) : null}
        </>
      )}
    </>
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
});
