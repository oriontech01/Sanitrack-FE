import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import { HamburgerMenu, TableIcon } from '../../../assets/svg/Index';
import colors from '../../../util/colors';
import Select from '../../../components/general/Select';
import Input from '../../../components/general/Input';
import Button from '../../../components/general/Button';

export default function InventoryHome({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
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
      <ScrollView horizontal style={styles.tableContainer}>
        <ScrollView>
          <View style={styles.tableHead}>
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

          <View style={[styles.tableHead, { backgroundColor: '#fff' }]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 150,
              }}>
              <Text style={{ marginRight: 20 }}>Item</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 150,
              }}>
              <Text style={{ marginRight: 20 }}>Description</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 150,
              }}>
              <Text style={{ marginRight: 20 }}>Quantity</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 150,
              }}>
              <Text style={{ marginRight: 20 }}>Unit Number</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
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
      </View>
      
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.overLay}>
          <View style={styles.content}>
            <Text style={{ color: colors.blue, fontWeight: 'bold' }}>
              Add Inventory Item
            </Text>
            <Input label="Item Name" />

            <Input label="Quantity In Store" />
            <Input label="Description" />
            <Input label="Unit of Measurement" />
            <TouchableOpacity style={styles.upload}>
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
            <Button
              style={{ marginTop: 20 }}
              onPress={() => setModalVisible(false)}
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
