import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';
import ItemList from './ItemList';

export default function ConfirmItems({ item, inspector = false }) {
  const [damaged, setDamaged] = useState(false);
  const [initialValue, setInitalValue] = useState(
    inspector ? item.quantity : ''
  );
  const [selected, setSelected] = useState(false);
  const [itemsToSubmit, setItemsToSubmit] = useState([]);
  const toggleSelect = () => setSelected((prev) => !prev);
  return (
    <View style={styles.container}>
      <ItemList item={item.item_name} />
      {selected ? (
        <Input
          labelStyle={{ textTransform: 'capitalize' }}
          placeholder="Quantity of Damaged Item"
          onChange={(val) => {
            setInitalValue(val);
            item.damagedQuantity = val;
          }}
          label={`${item.unit})`}
          value={initialValue}
        />
      ) : null}
      <View style={styles.selectible}>
        <TouchableOpacity
          onPress={() => {
            if (selected) {
              item.damaged = false;
            } else {
              item.damaged = true;
            }
            toggleSelect();
          }}
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
