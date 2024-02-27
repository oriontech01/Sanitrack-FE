import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../../../util/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function TimerList({ item }) {
  const scaleValue = useSharedValue(1);
  const navigation = useNavigation();
  const AnimatedStatus = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });
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
    scaleValue.value = withRepeat(
      withTiming(scaleValue.value == 1 ? 0.2 : 1, { duration: 1000 }),
      -1,
      true
    );
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('InspectorTimer', {
          taskId: item.taskId,
          id: item.id,
          roomName: item.roomName,
        });
      }}
      style={styles.container}>
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {formatTimer(Date.now() - item.start)}
        </Text>
        <Text style={{ color: colors.blue }}>{item.taskName}</Text>
      </View>
      <View>
        <Animated.View
          style={[styles.status, { backgroundColor: 'red' }, AnimatedStatus]}
        />
        <Text>21/02/24</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 73,
    borderBottomWidth: 0.3,
    borderBottomColor: '#BFBFBF',
  },
  status: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
});
