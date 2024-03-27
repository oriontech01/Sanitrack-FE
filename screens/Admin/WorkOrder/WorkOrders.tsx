import {
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FacilityList from '../../Home/components/FacilityList';
import useLocation from '../hooks/useLocations';
import colors from '../../../util/colors';
import useTask from '../hooks/useTask';
import Select from '../../../components/general/Select';
import Button from '../../../components/general/Button';

export default function WorkOrders({ navigation }) {
  const { getLocation, loading: loadingLocation, allLocations } = useLocation();
  const { getTask, loading, allTask } = useTask();
  const [modalVisible2, setModalVisible2] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getLocation();
    getTask();
  }, []);

  useEffect(() => {
    if (allLocations.length > 0) {
      const mapedLocations = allLocations.map((loc) => {
        return {
          value: loc._id,
          label: `${loc.country}| ${loc.state} ${loc.city}`,
        };
      });

      setOptions(mapedLocations);
    }
  }, [allLocations]);

  return (
    <SafeAreaView style={{ flex: 1, backfaceVisibility: '#fff' }}>
      <View style={styles.container}>
        <Header
          label="Work Order Facilities"
          withAdd={true}
          withBack={false}
          onAdd={() => {
            setModalVisible2(true);
          }}
          navigation={navigation}
        />
        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {!loading && (
            <>
              {allTask.map((oreder, ind) => (
                <FacilityList
                  key={ind.toString()}
                  title={oreder.roomName?.roomName}
                  detail={`${oreder.stage}`}
                  onPress={() => {
                    navigation.navigate('OrderSummary', {
                      id: oreder.roomName.location_id,
                      taskId: oreder.taskId,
                    });
                  }}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={styles.overLay}>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text
                style={{
                  color: colors.blue,
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                }}>
                Select Facility
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible2(false)}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#000',
                  borderRadius: 10,
                  marginLeft: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#fff' }}>X</Text>
              </TouchableOpacity>
            </View>

            <Select
              style={{ marginVertical: 20 }}
              label="Select Facility"
              onSelect={(val) => {
                setSelected(val);
              }}
              options={options}
            />
            <Button
              // style={{ marginTop: 'auto' }}
              onPress={() => {
                if (selected) {
                  navigation.navigate('AdminWorkorderDetail', {
                    id: selected.value,
                    name: selected.label,
                  });
                  setModalVisible2(false);
                }
              }}
              label="Next"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  overLay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxHeight: Dimensions.get('window').height / 1.4,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
});