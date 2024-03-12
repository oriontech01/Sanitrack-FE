import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import FacilityList from '../../Home/components/FacilityList';

export default function WorkOrders({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        label="Work Orders"
        withAdd
        withBack={false}
        onAdd={() => {}}
        navigation={navigation}
      />
      <FacilityList
        title="Discovery Mall"
        onPress={() => {
          navigation.navigate('AdminWorkorderDetail');
        }}
      />
      <FacilityList title="Discovery Mall" onPress={() => {}} />
      <FacilityList title="Discovery Mall" onPress={() => {}} />
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
