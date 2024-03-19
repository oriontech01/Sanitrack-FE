import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../components/general/Input';

export default function CleanItem({
  selectedItem,
  item,
  setSelected,
  setItems,
}) {
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Input
        style={{ width: '80%' }}
        value={value}
        onChange={(e) => {
          setValue(e);
          item.assignedValue = e;
        }}
        label={`${item.equipment} (${item.quantity} Available ${item.unit}) `}
      />
      <TouchableOpacity
        onPress={() => {
          const filtered = selectedItem.filter((e) => e._id !== item._id);
          setSelected(filtered);
          setItems((prev) => [...prev, item]);
        }}>
        <Text style={{ color: 'red' }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
