import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../util/colors';
import TimerList from './components/TimerList';

export default function TimerHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Timer</Text>
      <TimerList />
      <TimerList />
      <TimerList />
      <View style={styles.label}>
        <Text style={{ color: '#809997' }}>Yesterday</Text>
      </View>

      <TimerList />
      <TimerList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  header: {
    color: colors.blue,
    fontSize: 19,
    marginTop: 20,
    fontWeight: 'bold',
  },
  label: {
    width: '100%',
    padding: 5,
    backgroundColor: '#F5F5F5',
    marginTop: 20,
  },
});
