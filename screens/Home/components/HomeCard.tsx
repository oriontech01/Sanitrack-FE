import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function HomeCard() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 32,
          width: 32,
          borderRadius: 32,
          backgroundColor: 'rgba(0, 172, 108, 0.3)',
        }}></View>

      <Text
        style={{
          fontSize: 12,
          width: '80%',
          textAlign: 'center',
          color: '#595959',
        }}>
        Number of Active tasks
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'rgba(0, 172, 108, 1)',
          fontSize: 20,
        }}>
        5
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: '48%',
    elevation: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 5,
  },
});
