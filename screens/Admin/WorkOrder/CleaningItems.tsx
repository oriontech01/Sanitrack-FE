import {
  Dimensions,
  Image,
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
import Button from '../../../components/general/Button';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import MultipleSelect from '../../../components/general/MultippleSelect';
import ItemList from '../components/ItemList';
import colors from '../../../util/colors';
import Input from '../../../components/general/Input';
import useCleaningItems from '../hooks/useCleaninigItems';
import CleanItem from '../components/CleanItem';

export default function CleaningItems({ navigation, route }) {
  const { data } = route.params;
  const parsedData = JSON.parse(data);
  const { getItems, allItems } = useCleaningItems();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState('');
  const [items, setItems] = useState(allItems);
  const [selectedItem, setSelected] = useState([]);
  const borderWidthValue = useSharedValue(0);
  const onClose = () => {
    borderWidthValue.value = withTiming(0);
  };
  useEffect(() => {
    getItems();
    console.log(parsedData);
  }, []);

  useEffect(() => {
    if (allItems.length > 0) {
      setItems(allItems);
    }
  }, [allItems]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Header
          withAdd
          label="Select Cleaning Items"
          onAdd={() => setModalVisible(true)}
          navigation={navigation}
        />
        {selectedItem.length > 0 && (
          <>
            {selectedItem.map((item, ind) => {
              return (
                <CleanItem
                  key={ind.toString()}
                  selectedItem={selectedItem}
                  setItems={setItems}
                  item={item}
                  setSelected={setSelected}
                />
              );
            })}
          </>
        )}

        {selectedItem.length == 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              style={{
                width: '100%',
                height: 200,
                marginTop: 20,
              }}
              source={require('../../../assets/images/bro.png')}
            />
            <Text>Add Cleaning Items</Text>
          </View>
        )}
        <Button
          onPress={() => {
            const values = {
              ...parsedData,
              selectedItem,
            };
            navigation.navigate('SelectPersonel', {
              data: JSON.stringify(values),
            });
          }}
          style={{
            marginTop: 'auto',
            marginBottom: 20,
          }}
          label="Next"
        />

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.overLay}>
            <View style={styles.content}>
              <Text style={{ color: colors.blue, fontWeight: 'bold' }}>
                Select Items
              </Text>
              <ScrollView style={{ flex: 1 }}>
                {items.map((item) => (
                  <ItemList
                    allItems={items}
                    setAll={setItems}
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
              <Input
                value={itemName}
                onChange={(e) => {
                  setItemName(e);
                }}
                label="Item Name"
              />
              <Input
                onChange={(e) => {
                  setUnit(e);
                }}
                value={unit}
                label="Unit of Measurement"
              />
              <Button
                style={{ marginTop: 20 }}
                onPress={() => setModalVisible2(false)}
                label="Save Item"
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
