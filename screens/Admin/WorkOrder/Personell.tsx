import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Select from '../../../components/general/Select';
import Button from '../../../components/general/Button';

export default function Personell({ navigation }) {
  return (
    <View style={styles.container}>
      <Header
        label="Select Personel"
        onAdd={() => {}}
        navigation={navigation}
      />

      <Select
        style={{ marginTop: 20 }}
        options={[{ label: 'OtionA', value: '1' }]}
        onSelect={() => {}}
        label="Select Cleaner"
      />
      <Select
        style={{ marginTop: 20 }}
        options={[
          { label: 'OtionA', value: '1' },
          { label: 'Otion4', value: '2' },
        ]}
        onSelect={() => {}}
        label="Select Inspector"
      />
      <Button
        onPress={() => navigation.navigate('OrderSuccess')}
        style={{
          marginTop: 'auto',
          marginBottom: 20,
        }}
        label="Create Work Order"
      />
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
