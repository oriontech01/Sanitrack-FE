import React, { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../util/colors';

const styles = StyleSheet.create({
  checkBox: {
    height: 30,
    width: 30,
    backgroundColor: 'green',
    borderRadius: 20,
  },
});

const CheckBox = ({ handleSelection }) => {
  const [isSelected, setSelection] = useState(false);
  return (
    <TouchableOpacity onPress={() => {
      setSelection(!isSelected);
      handleSelection(!isSelected);
    }} style={styles.checkBox}>
      <Checkbox
        value={isSelected}
        onValueChange={(newValue) => {
          setSelection(newValue);
          handleSelection(newValue);
        }}
        color={isSelected ? colors.selectedColor : undefined}
        style={styles.checkBox}
      />
    </TouchableOpacity>
  );
};

export default CheckBox;