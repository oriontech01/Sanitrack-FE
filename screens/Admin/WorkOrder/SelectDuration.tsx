import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Select from '../../../components/general/Select';
import MultipleSelect from '../../../components/general/MultippleSelect';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';
import Button from '../../../components/general/Button';

export default function SelectDuration({ navigation }) {
  const borderWidthValue = useSharedValue(0);
  const onClose = () => {
    borderWidthValue.value = withTiming(0);
  };
  return (
    <View style={styles.container}>
      <Header
        label="Create Work Orders"
        onAdd={() => {}}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Select
          style={{ marginTop: 20 }}
          options={[{ label: 'OtionA', value: '1' }]}
          onSelect={() => {}}
          label="Select Location"
        />
        <Select
          style={{ marginTop: 20 }}
          options={[
            { label: 'OtionA', value: '1' },
            { label: 'Otion4', value: '2' },
          ]}
          onSelect={() => {}}
          label="Select Facility"
        />

        <MultipleSelect
          onClose={onClose}
          borderWidthValue={borderWidthValue}
          options={[
            { label: 'OtionA', value: '1' },
            { label: 'Otion4', value: '2' },
            { label: 'Otion3', value: '10' },
            { label: 'Otion5', value: '9' },
            { label: 'Otion6', value: '6' },
            { label: 'Otion7', value: '7' },
            { label: 'Otion10', value: '12' },
            { label: 'Otion11', value: '11' },
          ]}
          onSelect={() => {}}
          label="Select Facility"
          placeHolder="Select items"
        />

        <Text style={{ color: colors.blue, marginTop: 20 }}>
          Enter Duration - Clean
        </Text>
        <View style={styles.timing}>
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Hours"
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Mins"
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Secs"
          />
        </View>

        <Text style={{ color: colors.blue, marginTop: 20 }}>
          Enter Duration - Preop
        </Text>
        <View style={styles.timing}>
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Hours"
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Mins"
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Secs"
          />
        </View>

        <Text style={{ color: colors.blue, marginTop: 20 }}>
          Enter Duration - Release
        </Text>
        <View style={styles.timing}>
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Hours"
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Mins"
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Secs"
          />
        </View>
      </ScrollView>
      <Button
        onPress={() => navigation.navigate('AdminCleaningItems')}
        style={{ marginVertical: 10 }}
        label="Next"
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
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timingInput: {
    width: '30%',
  },
});
