import {
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import FacilityList from '../../Home/components/FacilityList';
import useLocation from '../hooks/useLocations';
import useFacility from '../hooks/useFacility';
import Button from '../../../components/general/Button';
import Input from '../../../components/general/Input';
import colors from '../../../util/colors';

export default function WorOrderDetail({ navigation, route }) {
  const { id, name: locationName } = route.params;
  const {
    facilities,
    loadingFacilities,
    getAllFacilities,
    addFacility,
    updating,
  } = useFacility(id);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [name, setName] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Header
          label={locationName}
          withAdd
          onAdd={() => setModalVisible2(true)}
          navigation={navigation}
        />
        <Text style={{ color: '#999999', marginVertical: 10, fontSize: 12 }}>
          Rooms {`(${facilities.length})`}
        </Text>

        {loadingFacilities && (
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
        <ScrollView>
          {!loadingFacilities && (
            <>
              {facilities.map((fac, ind) => (
                <FacilityList
                  key={ind.toString()}
                  title={fac.facility_name}
                  onPress={() => {
                    navigation.navigate('SelectDuration', {
                      facility: fac,
                    });
                  }}
                />
              ))}
            </>
          )}
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={modalVisible2}>
          <View style={styles.overLay}>
            <View style={styles.content}>
              <Text style={{ color: colors.blue, fontWeight: 'bold' }}>
                Add New Facility
              </Text>
              <Input
                value={name}
                onChange={(e) => setName(e)}
                label="Facility Name"
              />

              <Button
                isLoading={updating}
                style={{ marginTop: 20 }}
                onPress={async () => {
                  const added = await addFacility(name);
                  if (added) {
                    setModalVisible2(false);
                  }
                }}
                label="Add Facility"
              />
            </View>
          </View>
        </Modal>
      </View>
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
    height: Dimensions.get('window').height / 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
});
