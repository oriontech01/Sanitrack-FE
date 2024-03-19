import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Select from '../../../components/general/Select';
import MultipleSelect from '../../../components/general/MultippleSelect';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';
import Button from '../../../components/general/Button';
import useRoom from '../hooks/useRoom';

export default function SelectDuration({ navigation, route }) {
  const { facility } = route.params;
  const [itemsToClean, setItemsToClean] = useState([]);
  const [clean, setClean] = useState({
    hours: '',
    minutes: '',
  });
  const [preop, setPreop] = useState({
    hours: '',
    minutes: '',
  });
  const [release, setRelease] = useState({
    hours: '',
    minutes: '',
  });
  const { getUnassignedRoomById, allUnassignedRoomsById, isLoading } =
    useRoom();
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(undefined);

  const [selectedItemsToCleaan, setSelectedItemsToClean] = useState(undefined);
  const borderWidthValue = useSharedValue(0);
  const onClose = () => {
    borderWidthValue.value = withTiming(0);
  };
  useEffect(() => {
    getUnassignedRoomById(facility.location_id);
  }, []);

  useEffect(() => {
    if (allUnassignedRoomsById.length > 0) {
      const mappedRoom = allUnassignedRoomsById.map((room) => {
        return {
          value: room._id,
          label: room.roomName,
        };
      });

      setOptions(mappedRoom);
    }
  }, [allUnassignedRoomsById]);
  return (
    <View style={styles.container}>
      <Header
        label="Create Work Orders"
        onAdd={() => {}}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Text style={{ marginVertical: 10, opacity: 0.4 }}>Facility Name</Text>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            opacity: 0.4,
            marginBottom: 20,
          }}>
          <Text>{facility.facility_name}</Text>
        </View>
        {isLoading && <ActivityIndicator color={colors.blue} />}
        {!isLoading && (
          <Select
            options={options}
            onSelect={(e) => {
              setSelected(e);
              const filtered = allUnassignedRoomsById.filter(
                (room) => room._id === e.value
              );

              const mappedData = filtered[0].detail.detail.map((det) => {
                return {
                  label: det.name,
                  value: det._id,
                };
              });
              setItemsToClean(mappedData);
              console.log(mappedData);
            }}
            label={
              allUnassignedRoomsById.length > 0
                ? 'Please select room'
                : 'No unassigned rooms!'
            }
            placeHolder="Select items"
          />
        )}

        <MultipleSelect
          style={{ marginVertical: 20 }}
          onClose={onClose}
          borderWidthValue={borderWidthValue}
          options={itemsToClean}
          onSelect={(e) => {
            setSelectedItemsToClean(e.values);
          }}
          label="Select Items to Clean"
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
            value={clean.hours}
            onChange={(e) => {
              setClean((prev) => {
                return {
                  ...prev,
                  hours: e,
                };
              });
            }}
          />
          <Input
            type="number-pad"
            style={styles.timingInput}
            placeholder="Mins"
            value={clean.minutes}
            onChange={(e) => {
              setClean((prev) => {
                return {
                  ...prev,
                  minutes: e,
                };
              });
            }}
          />
        </View>

        <Text style={{ color: colors.blue, marginTop: 20 }}>
          Enter Duration - Preop
        </Text>
        <View style={styles.timing}>
          <Input
            value={preop.hours}
            onChange={(e) => {
              setPreop((prev) => {
                return {
                  ...prev,
                  hours: e,
                };
              });
            }}
            type="number-pad"
            style={styles.timingInput}
            placeholder="Hours"
          />
          <Input
            value={preop.minutes}
            onChange={(e) => {
              setPreop((prev) => {
                return {
                  ...prev,
                  minutes: e,
                };
              });
            }}
            type="number-pad"
            style={styles.timingInput}
            placeholder="Mins"
          />
        </View>

        <Text style={{ color: colors.blue, marginTop: 20 }}>
          Enter Duration - Release
        </Text>
        <View style={styles.timing}>
          <Input
            value={release.hours}
            onChange={(e) => {
              setRelease((prev) => {
                return {
                  ...prev,
                  hours: e,
                };
              });
            }}
            type="number-pad"
            style={styles.timingInput}
            placeholder="Hours"
          />
          <Input
            value={release.minutes}
            onChange={(e) => {
              setRelease((prev) => {
                return {
                  ...prev,
                  minutes: e,
                };
              });
            }}
            type="number-pad"
            style={styles.timingInput}
            placeholder="Mins"
          />
        </View>
      </ScrollView>
      <Button
        onPress={() => {
          if (selected == undefined) {
            alert('Please select a items');
            return;
          }

          navigation.navigate('AdminCleaningItems', {
            data: JSON.stringify({
              preop,
              clean,
              release,
              facility,
              selected,
              itemsToClean,
              
            }),
          });
        }}
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
    width: '45%',
  },
});
