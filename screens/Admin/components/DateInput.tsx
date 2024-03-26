import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import colors from '../../../util/colors';
import { ArrowDownIcon2 } from '../../../assets/svg/Index'; // Replace with actual import

const DateInput = ({ label, style, onChange, showDate, date, setShowDate }) => {
  const borderWidthValue = useSharedValue(1);

  const displayDate = date.toLocaleDateString(); // Using the locale date string

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderWidthValue.value === 2 ? colors.darkblue : '#1b2a3b43',
    };
  });

  return (
    <View style={[styles.mainContainer, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputContainer, animatedBorderStyle]}>
        <TouchableOpacity
          onPress={() => setShowDate(true)}
          style={styles.dateTouch}>
          <Text style={styles.textInput}>{displayDate}</Text>
          {/* <ArrowDownIcon2 /> Replace with actual icon */}
        </TouchableOpacity>
      </Animated.View>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
      width: '100%',
      marginTop: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: '#1A1A1A',
      marginBottom: 10,
    },
    inputContainer: {
      height: 48,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#1b2a3b43',
    },
    dateTouch: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textInput: {
      fontSize: 16,
      color: '#000',
    },
    // ...include other styles from the original Input component as needed
  });

export default DateInput;
