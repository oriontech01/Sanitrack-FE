import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Select from '../../../components/general/Select';
import Button from '../../../components/general/Button';
import useCleaner from '../hooks/useCleaner';
import MultipleSelect from '../../../components/general/MultippleSelect';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import useInspector from '../hooks/useInspector';
import useCreateTask from '../hooks/useCreateTask';

export default function Personell({ navigation, route }) {
  const { data } = route.params;
  const parsedData = JSON.parse(data);
  const [options, setOptions] = useState([]);
  const borderWidthValue = useSharedValue(0);
  const borderWidthValue2 = useSharedValue(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inspectorOption, setInspectorOption] = useState([]);
  const [selectedInspectors, selectInspectors] = useState([]);
  const { createTask, submitting } = useCreateTask();
  const onClose = () => {
    borderWidthValue.value = withTiming(0);
  };
  const onClose2 = () => {
    borderWidthValue2.value = withTiming(0);
  };
  const { getCleaners, allCleaner } = useCleaner();
  const { getInspectors, allInspectors } = useInspector();
  useEffect(() => {
    getCleaners();
    getInspectors();
    // console.log(parsedData);
  }, []);
  useEffect(() => {
    if (allCleaner.length > 0) {
      const mappedCleaner = allCleaner.map((cleaner) => {
        return {
          value: cleaner._id,
          label: cleaner.username,
        };
      });
      setOptions(mappedCleaner);
    }
  }, [allCleaner]);

  useEffect(() => {
    if (allInspectors.length > 0) {
      const mappedCleaner = allInspectors.map((cleaner) => {
        return {
          value: cleaner._id,
          label: cleaner.username,
        };
      });
      setInspectorOption(mappedCleaner);
    }
  }, [allInspectors]);
  return (
    <View style={styles.container}>
      <Header
        label="Select Personel"
        onAdd={() => {}}
        navigation={navigation}
      />

      <MultipleSelect
        onClose={onClose}
        borderWidthValue={borderWidthValue}
        style={{ marginTop: 20 }}
        options={options}
        onSelect={(e) => {
          setSelectedOptions(e.values);
        }}
        label="Select Cleaner"
      />
      <MultipleSelect
        onClose={onClose2}
        borderWidthValue={borderWidthValue2}
        style={{ marginTop: 20 }}
        options={inspectorOption}
        onSelect={(e) => {
          selectInspectors(e.values);
        }}
        label="Select Inspector"
      />
      <Button
        isLoading={submitting}
        onPress={async () => {
          const bodyData = {
            roomId: parsedData.selected.value,
            inspectors: selectedInspectors.map((ins) => ins.value),
            cleaners: selectedOptions.map((cl) => cl.value), //user add
            locationId: parsedData.facility.location_id,
            clean_hours: parsedData.clean.hours,
            clean_minutes: parsedData.clean.minutes,
            preop_hours: parsedData.preop.hours,
            preop_minutes: parsedData.preop.minutes,
            cleaningData: parsedData.selectedItem.map((sl) => {
              return {
                cleaning_id: sl._id,
                item_name: sl.equipment,
                quantity: sl.assignedValue,
                unit: sl.unit,
              };
            }),

            itemsToClean: parsedData.itemsToClean.map((rm) => {
              return {
                roomDetailId: rm.value,
                name: rm.label,
              };
            }),
          };
          // console.log(bodyData);
          // return;
          const created = await createTask(bodyData);
          if (created) {
            navigation.navigate('OrderSuccess');
          }
        }}
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
