import { useTheme } from '@react-navigation/native';
import { ReactElement, useState } from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import colors from '../../util/colors';
import { EyeOffIcon, EyeOpenIcon } from '../../assets/svg/Index';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
export interface InputProps {
  onChange?: (e: string) => void;
  label?: string;
  style?: ViewStyle;
  type?: KeyboardType;
  secureEntry?: boolean;
  Icon?: ReactElement;
  IconLeft?: ReactElement;
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
}
function Input({
  onChange,
  label,
  style,
  type,
  Icon,
  placeholder,
  required = false,
  secureEntry = false,
  onBlur,
  onFocus,
  value,
  IconLeft,
  disabled,
}: InputProps) {
  const borderWidthValue = useSharedValue(0);

  const reanimtedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      borderWidthValue.value,
      [0, 2],
      ['#1b2a3b43', colors.darkblue]
    );
    const bgColor = interpolateColor(
      borderWidthValue.value,
      [0, 2],
      ['#F5F5F5', '#f5f5f5']
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
  const [secured, setSecured] = useState(true);
  return (
    <View
      style={[styles.mainContainer, { opacity: disabled ? 0.7 : 1 }, style]}>
      <View style={styles.labelContainer}>
        {label && (
          <Animated.Text style={[styles.label, reanimatedLabelStyle]}>
            {label}
          </Animated.Text>
        )}
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <AnimatedTouchableOpacity
        style={[styles.inputContainer, reanimtedBorderStyle]}>
        {IconLeft && IconLeft}
        <TextInput
          editable={disabled}
          selectTextOnFocus={disabled}
          value={`${value || ''}`}
          keyboardType={type}
          onChangeText={onChange}
          secureTextEntry={secureEntry ? secured : false}
          onFocus={() => {
            if (disabled) {
              return;
            }
            borderWidthValue.value = withTiming(2);
            onFocus?.();
          }}
          onBlur={() => {
            borderWidthValue.value = withTiming(0);
            onBlur?.();
          }}
          placeholder={placeholder}
          placeholderTextColor="#898989"
          style={[
            styles.textInput,
            {
              color: '#000',
              backgroundColor: '#f5f5f5',
            },
          ]}
        />
        {Icon && Icon}
        {secureEntry && (
          <TouchableOpacity
            onPress={() => setSecured((prev) => !prev)}
            style={styles.iconRight}>
            {secured ? <EyeOpenIcon /> : <EyeOffIcon color="#000" />}
          </TouchableOpacity>
        )}
      </AnimatedTouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 20,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  required: {
    color: 'red',
    fontWeight: 'bold',
  },
  inputContainer: {
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  textInput: {
    width: '90%',
    backgroundColor: '#fff',
    height: 40,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
});

export default Input;
