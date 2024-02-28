import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../../util/colors';

export default function ItemList({ item = '', title = '' }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.blue,
          fontSize: 18,
          textTransform: 'capitalize',
        }}>
        {item}
      </Text>
      <Text
        style={{ color: 'gray', fontSize: 14, textTransform: 'capitalize' }}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,

    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightgray,
    marginBottom: 20,
  },
});
