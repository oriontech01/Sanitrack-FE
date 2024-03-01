import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function HomeCard({ Icon, label, value, color, loading }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 32,
          width: 32,
          borderRadius: 32,
          backgroundColor: `rgba(${color}, 0.3)`,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {<Icon />}
      </View>

      <Text
        style={{
          fontSize: 12,
          width: '80%',
          textAlign: 'center',
          color: '#595959',
        }}>
        {label}
      </Text>
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text
          style={{
            fontWeight: 'bold',
            color: `rgba(${color}, 1)`,
            fontSize: 20,
          }}>
          {value}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: 191,
    elevation: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});
