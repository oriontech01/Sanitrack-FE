import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';

export default function CleaningItemList() {
  const [selected, setSelected] = useState(false);
  const toggleSelect = () => setSelected((prev) => !prev);
  return (
    <View style={styles.container}>
      <Input label="Brooms (Number)" value={3} disabled />
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
        <Text style={{ color: '#999999' }}>Collected by me</Text>
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
