import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
// import Text from '../AppText';

import Icon from 'react-native-vector-icons/Ionicons';

import Animated, {
  SharedValue,
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
  onSelect: ({
    values,
  }: {
    values: { value: string; label: string }[];
  }) => void;
  placeHolder?: string;
  error?: string;
  style?: ViewStyle;
  label?: string;
  onClose?: () => void;
  borderWidthValue;
}
export default function MultipleSelect({
  options,
  onSelect,
  placeHolder = 'Select',
  error,
  style,
  label,
  onClose,
  borderWidthValue,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [selectedValues, setSelectedValues] = useState([]);

  const close = () => {
    borderWidthValue.value = withTiming(0);
  };
  //   const { height: 320 } = Dimensions.get('window');
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
    const height = interpolate(borderWidthValue.value, [0, 2], [80, 320]);
    return { maxHeight: height };
  });
  return (
    <Animated.View style={[{ overflow: 'hidden' }, reanimtedHeiht, style]}>
      <Animated.Text style={[reanimatedLabelStyle]}>{label}</Animated.Text>
      <AnimatedTouchable
        onPress={() => {
          if (borderWidthValue.value == 2) {
            onClose();
            return;
          }

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
          {selectedValues.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                width: '90%',
                overflow: 'hidden',
              }}>
              {selectedValues.map((v, i) => (
                <TouchableOpacity
                  onPress={() => {
                    const filtered = selectedValues.filter(
                      (opt) => opt.value !== v.value
                    );
                    setSelectedValues(filtered);
                  }}
                  style={{
                    backgroundColor: colors.blue,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    justifyContent: 'center',
                  }}
                  key={i.toString()}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>{v.label}</Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    X
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>{placeHolder}</Text>
          )}
          <ArrowUpIcon />
        </View>
      </AnimatedTouchable>

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
        }}
        style={styles.outerLayer}
        onStartShouldSetResponder={() => false}
        onStartShouldSetResponderCapture={() => false}
        >
        {options.map((option, ind) => (
          <AnimatedTouchable
            key={ind}
            onPress={() => {
              if (
                selectedValues.filter((v) => v.value == option.value).length > 0
              ) {
                const filtered = selectedValues.filter(
                  (v) => v.value !== option.value
                );
                setSelectedValues(filtered);
                onSelect({ values: filtered });
              } else {
                setSelectedValues((prev) => {
                  onSelect({ values: [...prev, option] });
                  return [...prev, option];
                });
              }
            }}
            style={[styles.selectButton, { marginTop: 5 }]}>
            <View
              style={[styles.placeHolder, { justifyContent: 'flex-start' }]}>
              {selectedValues.filter((v) => v.value == option.value).length >
              0 ? (
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
      </ScrollView>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  selectButton: {
    height: 48,
    width: '100%',
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    zIndex: -10,
  },
  placeHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  outerLayer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.darkblue,
    marginTop: 10,
    maxHeight: 300,
    overflow: 'hidden',
  },
  decoration: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#999999',
  },
});