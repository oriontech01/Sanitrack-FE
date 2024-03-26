import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Select from '../../../components/general/Select';

const DurationInput = ({ label, onDurationChange, style, hourValue, minuteValue }) => {
  // Generate array of options for hours and minutes
  const hours = [...Array(24).keys()].map((h) => ({ label: `${h} hr`, value: h }));
  const minutes = [...Array(60).keys()].map((m) => ({ label: `${m} min`, value: m }));

  const handleHoursChange = (selected) => {
    onDurationChange((prev) => ({ ...prev, stage_hour: selected.value }));
  };

  const handleMinutesChange = (selected) => {
    onDurationChange((prev) => ({ ...prev, stage_minute: selected.value }));
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.durationContainer}>
        <Select
          options={hours}
          onSelect={handleHoursChange}
          placeHolder={hourValue}
          style={styles.durationPicker}
        />
        <Select
          options={minutes}
          onSelect={handleMinutesChange}
          placeHolder={minuteValue}
          style={styles.durationPicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  label: {
    paddingBottom: 10,
    fontSize: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationPicker: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default DurationInput;
