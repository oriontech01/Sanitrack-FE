import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../util/colors';
import Input from '../../../components/general/Input';

export default function ConfirmRequestItem({ item, setAll }) {
  const [selected, setSelected] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [comment, setComment] = useState('');
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setAll((prev) => {
            const filteredData = prev.filter(
              (myItem) => myItem._id !== item._id
            );
            console.log(filteredData);
            return filteredData;
          });
        }}
        style={styles.selected}>
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
      <Input
        value={quantity}
        onChange={(e) => {
          setQuantity(e);
          item.requiredQuantity = e;
        }}
        label={`Available (${item.quantity})`}
        placeholder="Enter Quantity"
      />
      <Input
        value={comment}
        onChange={(e) => {
          setComment(e);
          item.comment = e;
        }}
        placeholder="Enter Commets"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selected: {
    height: 69,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
});
