import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';

export default function ConfirmItems({ item, inspector = false }) {
  const [initialValue, setInitalValue] = useState(
    inspector ? item.quantity : ''
  );
  const [selected, setSelected] = useState(false);
  const [itemsToSubmit, setItemsToSubmit] = useState([]);
  const toggleSelect = () => setSelected((prev) => !prev);
  return (
    <View style={styles.container}>
      <Input
        labelStyle={{ textTransform: 'capitalize' }}
        onChange={(val) => {
          setInitalValue(val);
          item.value = val;
        }}
        label={`${item.item_name} (${item.unit})`}
        value={initialValue}
      />
      <View style={styles.selectible}>
        <TouchableOpacity
          onPress={toggleSelect}
          style={{
            height: 20,
            width: 20,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 20,
            marginRight: 5,
            backgroundColor: selected ? colors.blue : 'transparent',
          }}
        />
        <Text
          style={{
            color: '#999999',
            textAlign: 'center',
            marginLeft: 5,
          }}>
          Damaged?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  selectible: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
