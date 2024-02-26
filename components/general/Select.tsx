import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import React, { useState } from 'react';
// import Text from '../AppText';

import Icon from 'react-native-vector-icons/Ionicons';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import colors from '../../util/colors';
import { ArrowUpIcon, IconParck } from '../../assets/svg/Index';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
interface SelectProps {
  options: { value: string; label: string }[] | [];
  onSelect: ({ value, label }: { value: string; label: string }) => void;
  placeHolder?: string;
  error?: string;
  style?: ViewStyle;
  label?: string;
}
export default function Select({
  options,
  onSelect,
  placeHolder = 'Select',
  error,
  style,
  label,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(undefined);
  const borderWidthValue = useSharedValue(0);
  const { height: WindowHeigth } = Dimensions.get('window');
  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [0, 2],
      ['#1b2a3b43', colors.darkblue]
    );
    const bgColor = interpolateColor(
      borderWidthValue.value,
      [0, 2],
      ['#F5F5F5', '#fff']
    );
    return {
      borderWidth: borderWidthValue.value,
      borderColor,
      backgroundColor: bgColor,
    };
  });

  const reanimatedLabelStyle = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      borderWidthValue.value,
      [0, 2],
      ['#999999', colors.darkblue]
    );

    return {
      color: textColor,
    };
  });

  const reanimtedHeiht = useAnimatedStyle(() => {
    const height = interpolate(
      borderWidthValue.value,
      [0, 2],
      [80, WindowHeigth]
    );
    return { maxHeight: height };
  });
  return (
    <Animated.View style={[{ overflow: 'hidden' }, reanimtedHeiht, style]}>
      <Animated.Text style={[reanimatedLabelStyle]}>{label}</Animated.Text>
      <AnimatedTouchable
        onPress={() => {
          borderWidthValue.value = withSpring(2, {
            dampingRatio: 0.7,
            stiffness: 25,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
          });
        }}
        style={[styles.selectButton, reanimtedBorderStyle]}>
        <View style={styles.placeHolder}>
          <Text>{selectedValue ? selectedValue.label : placeHolder}</Text>
          <ArrowUpIcon />
        </View>
      </AnimatedTouchable>

      <View style={styles.outerLayer}>
        {options.map((option, ind) => (
          <AnimatedTouchable
            key={ind}
            onPress={() => {
              setSelectedValue(option);
              onSelect(option);
              borderWidthValue.value = withTiming(0);
            }}
            style={[styles.selectButton, { marginTop: 5 }]}>
            <View
              style={[styles.placeHolder, { justifyContent: 'flex-start' }]}>
              {option.value == selectedValue?.value ? (
                <IconParck />
              ) : (
                <View style={styles.decoration} />
              )}
              <Text
                style={{
                  marginLeft: 10,
                  color:
                    option.value == selectedValue ? colors.darkblue : '#999999',
                }}>
                {option.label}
              </Text>
            </View>
          </AnimatedTouchable>
        ))}
      </View>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  selectButton: {
    height: 48,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  placeHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  outerLayer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.darkblue,
    marginTop: 10,
  },
  decoration: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#999999',
  },
});
