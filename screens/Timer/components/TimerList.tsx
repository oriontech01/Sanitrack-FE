import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../../util/colors';

export default function TimerList() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: colors.blue }}>Discovery Mall - Board room</Text>
        <Text>02:17:01</Text>
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
