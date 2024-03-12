import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../util/colors';

export default function RequestItem({ addToSelect, item }) {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        if (!selected) {
          addToSelect((prev) => [...prev, item]);
        } else {
          addToSelect((prev) => {
            const filteredData = prev.filter(
              (myItem) => myItem._id !== item._id
            );
            return filteredData;
          });
        }
        setSelected((prev) => !prev);
      }}
      style={styles.container}>
      <Text style={{ color: colors.blue }}>{item.equipment}</Text>
      <View
        style={{
          height: 21,
          width: 21,
          borderColor: colors.lightgray,
          borderWidth: 1,
          borderRadius: 21,
          backgroundColor: selected ? colors.blue : 'transparent',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 69,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
});
