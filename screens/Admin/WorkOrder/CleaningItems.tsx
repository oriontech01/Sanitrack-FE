import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../../../components/general/Button';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import MultipleSelect from '../../../components/general/MultippleSelect';
import ItemList from '../components/ItemList';
import colors from '../../../util/colors';
import Input from '../../../components/general/Input';

export default function CleaningItems({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [items] = useState([
    { _id: '001', equipment: 'nnow' },
    { _id: '002', equipment: 'ow' },
  ]);
  const [selectedItem, setSelected] = useState([]);
  const borderWidthValue = useSharedValue(0);
  const onClose = () => {
    borderWidthValue.value = withTiming(0);
  };
  return (
    <View style={styles.container}>
      <Header
        withAdd
        label="Select Cleaning Items"
        onAdd={() => setModalVisible2(true)}
        navigation={navigation}
      />
      <Input placeholder="" label="Mops (Number)" />
      <Input placeholder="" label="Mops (Number)" />
      <Button
        onPress={() => navigation.navigate('SelectPersonel')}
        style={{
          marginTop: 'auto',
          marginBottom: 20,
        }}
        label="Next"
      />
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: '100%',
            height: 200,
            marginTop: 20,
          }}
          source={require('../../../assets/images/bro.png')}
        />
      </View>

      <Button
        onPress={() => setModalVisible(true)}
        style={{ marginTop: 20 }}
        label="Select Cleaning Items"
      /> */}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.overLay}>
          <View style={styles.content}>
            <Text style={{ color: colors.blue, fontWeight: 'bold' }}>
              Select Items
            </Text>
            <ScrollView style={{ flex: 1 }}>
              {items.map((item) => (
                <ItemList
                  item={item}
                  addToSelect={setSelected}
                  key={item._id}
                />
              ))}
            </ScrollView>
            <Button
              onPress={() => setModalVisible(false)}
              label="Save Selection"
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View style={styles.overLay}>
          <View style={styles.content}>
            <Text style={{ color: colors.blue, fontWeight: 'bold' }}>
              Add New Item
            </Text>
            <Input label="Item Name" />
            <Input label="Unit of Measurement" />
            <Button
              style={{ marginTop: 20 }}
              onPress={() => setModalVisible2(false)}
              label="Save Item"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
