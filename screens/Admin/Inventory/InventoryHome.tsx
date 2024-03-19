import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { HamburgerMenu, TableIcon } from '../../../assets/svg/Index';
import colors from '../../../util/colors';
import Select from '../../../components/general/Select';
import Input from '../../../components/general/Input';
import Button from '../../../components/general/Button';
import useGetAllInventory from '../hooks/useGetAllInventory';
import * as ImagePicker from 'expo-image-picker';
import useAddInventor from '../hooks/useAddInventory';

export default function InventoryHome({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { getItems, loading, allItems } = useGetAllInventory();
  const { addInventory, adding } = useAddInventor();
  const [myitem, setMyitem] = useState({
    name: '',
    unit: '',
    quantity: '',
    description: '',
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uriParts = result.assets[0].uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      setImage({ uri: result.assets[0].uri, type: `image/${fileType}` });
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <HamburgerMenu />
      </TouchableOpacity>
      <Header
        navigation={navigation}
        onAdd={() => setModalVisible(true)}
        withAdd
        withBack={false}
        label="Inventory"
      />
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}
      {!loading && (
        <ScrollView horizontal style={styles.tableContainer}>
          <ScrollView>
            <View style={styles.tableHead}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                }}>
                <Text style={{ marginRight: 20 }}>S/N</Text>
                <TableIcon />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                }}>
                <Text style={{ marginRight: 20 }}>Item</Text>
                <TableIcon />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                }}>
                <Text style={{ marginRight: 20 }}>Description</Text>
                <TableIcon />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                }}>
                <Text style={{ marginRight: 20 }}>Quantity</Text>
                <TableIcon />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 150,
                }}>
                <Text style={{ marginRight: 20 }}>Unit Number</Text>
                <TableIcon />
              </View>
            </View>
            {allItems.length > 0 &&
              allItems.map((item, ind) => (
                <View
                  key={ind.toString()}
                  style={[styles.tableHead, { backgroundColor: '#fff' }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 150,
                    }}>
                    <Text
                      style={{ marginRight: 20, textTransform: 'capitalize' }}>
                      {ind + 1}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 150,
                    }}>
                    <Text
                      style={{ marginRight: 20, textTransform: 'capitalize' }}>
                      {item.equipment}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 150,
                    }}>
                    <Text
                      style={{ marginRight: 20, textTransform: 'capitalize' }}>
                      {item.description}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 150,
                    }}>
                    <Text
                      style={{ marginRight: 20, textTransform: 'capitalize' }}>
                      {item.quantity}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 150,
                    }}>
                    <Text
                      style={{ marginRight: 20, textTransform: 'capitalize' }}>
                      {item.unit}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </ScrollView>
      )}
      {/* <View style={styles.footer}>
        <Text style={{ color: colors.blue, fontWeight: '800' }}>
          Page 1 of 30
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>Go to page</Text>
        </View>
      </View> */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.overLay}>
          <ScrollView style={styles.content}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{ color: colors.blue, fontWeight: 'bold' }}>
                Add Inventory Item
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
            <Input
              value={myitem.name}
              onChange={(e) => {
                setMyitem((prev) => {
                  return {
                    ...prev,
                    name: e,
                  };
                });
              }}
              label="Item Name"
            />

            <Input
              value={myitem.quantity}
              onChange={(e) => {
                setMyitem((prev) => {
                  return {
                    ...prev,
                    quantity: e,
                  };
                });
              }}
              label="Quantity In Store"
            />
            <Input
              value={myitem.description}
              onChange={(e) => {
                setMyitem((prev) => {
                  return {
                    ...prev,
                    description: e,
                  };
                });
              }}
              label="Description"
            />
            <Input
              value={myitem.unit}
              onChange={(e) => {
                setMyitem((prev) => {
                  return {
                    ...prev,
                    unit: e,
                  };
                });
              }}
              label="Unit of Measurement"
            />
            <Select
              label="Item Type"
              options={[
                { value: 'consumable', label: 'Consumable' },
                { label: 'Tool', value: 'tool' },
              ]}
              onSelect={(e) => {
                setSelectedItem(e);
              }}
            />
            <TouchableOpacity onPress={pickImage} style={styles.upload}>
              <Image
                style={styles.export}
                source={require('../../../assets/images/export.png')}
              />
              <Text
                style={{
                  color: '#AF6D31',
                }}>
                Upload Image {'(JPEG OR PNG)'}
              </Text>
            </TouchableOpacity>
            {image && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 20,
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <Text>Uploaded Image</Text>
              </View>
            )}
            <Button
              isLoading={adding}
              style={{ marginTop: 20, marginBottom: 20 }}
              onPress={async () => {
                const formData = new FormData();
                console.log({
                  uri: image.uri,
                  name: 'image.png',
                  type: image.type,
                });
                formData.append('image', {
                  uri: image.uri,
                  name: 'image',
                  type: image.type,
                });
                formData.append('pairs', 'false');
                formData.append('name', myitem.name);
                formData.append('unit', myitem.unit);
                formData.append('type', selectedItem.value);
                formData.append('quantity', myitem.quantity);
                formData.append('description', myitem.description);
                const addedd = await addInventory(formData);
                if (addedd) {
                  alert('Successfully added an items');
                  setModalVisible(false);
                  setImage(null);
                  setMyitem({
                    name: '',
                    unit: '',
                    quantity: '',
                    description: '',
                  });
                }
                // setModalVisible(false);
              }}
              label="Save Item"
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tableContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightgray,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableHead: {
    maxHeight: 44,
    minHeight: 44,

    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
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
    height: Dimensions.get('window').height / 1.1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  upload: {
    height: 80,
    width: '100%',
    backgroundColor: '#FFF7F0',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  export: {
    height: 24,
    width: 24,
  },
});
