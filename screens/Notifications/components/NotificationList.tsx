import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../../util/colors';

export default function NotificationList({date, title, body}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: colors.blue }}>{title}</Text>
        <Text style={{ color: '#595959' }}>
         {body}
        </Text>
      </View>

      <Text>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 73,
    borderBottomWidth: 0.3,
    borderBottomColor: '#BFBFBF',
  },
});
