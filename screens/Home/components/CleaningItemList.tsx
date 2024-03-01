import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';

export default function CleaningItemList({ item, inspector = false }) {
  const [initialValue, setInitalValue] = useState(
    inspector ? item.quantity : ''
  );

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
