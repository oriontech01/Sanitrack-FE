import {
  Image,
  ImageBackground,
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
import { ArrowLeftIcon } from '../../assets/svg/Index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RoomItems from './components/RoomItems';

export default function MainRoomDetails({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
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
        <Text style={styles.haeding}>Room A</Text>
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
          backgroundColor="#E0E8FF">
          {(fill) => (
            <Text
              style={{
                width: '100%',
                marginRight: 'auto',

                fontSize: 20,
                transform: [{ translateX: 100 }],
              }}>
              {formatTime(seconds)} Sec
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.buttons}>
        <Button
          onPress={handleStartStop}
          label="Start Timer"
          style={styles.button}
        />
        <Button
          onPress={handleStartStop}
          fontStyle={{
            color: '#AF3030',
          }}
          label="Stop Timer"
          style={{
            ...styles.button,
            backgroundColor: '#FFE0E0',
          }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <RoomItems />
        <RoomItems />
        <RoomItems />

        <Button label="Submit" />
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
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
  },
});
