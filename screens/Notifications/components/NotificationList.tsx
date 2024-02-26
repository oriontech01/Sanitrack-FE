import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../../util/colors';

export default function NotificationList() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: colors.blue }}>New Work Order</Text>
        <Text style={{ color: '#595959' }}>
          Adewale has assigne a task to you
        </Text>
      </View>

      <Text>21/02/24</Text>
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
