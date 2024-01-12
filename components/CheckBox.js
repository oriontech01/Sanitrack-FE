import React, {useState} from 'react'
import Checkbox  from 'expo-checkbox';
import {TouchableOpacity, StyleSheet} from 'react-native'
import colors from '../util/colors';

const styles = StyleSheet.create({
    checkBox: {
        height: 30,
        width: 30,
        backgroundColor: colors.lightgray,
        borderRadius: 5
     }
})
const CheckBox = () => {
const [isSelected, setSelection] = useState(false);
  return (
    <TouchableOpacity>
    <Checkbox
        value={isSelected}
        onValueChange={setSelection}
        color={isSelected ? colors.selectedColor : undefined}
        style={styles.checkBox}
      />
    </TouchableOpacity>
  )
}

export default CheckBox