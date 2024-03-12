import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import FacilityList from '../../Home/components/FacilityList';

export default function WorOrderDetail({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        label="Discoverry Mall"
        withAdd
        onAdd={() => {}}
        navigation={navigation}
      />
      <Text style={{ color: '#999999', marginVertical: 10, fontSize: 12 }}>
        Facilities to clean {`(9)`}
      </Text>
      <FacilityList
        title="Board Room"
        onPress={() => {
          navigation.navigate('SelectDuration');
        }}
      />
      <FacilityList title="Bath Mall" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
