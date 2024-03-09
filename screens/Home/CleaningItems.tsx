import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import colors from '../../util/colors';
import Select from '../../components/general/Select';
import Button from '../../components/general/Button';
import {
  ArrowLeftIcon,
  EyeScan,
  Location,
  QrCode,
} from '../../assets/svg/Index';
import FacilityList from './components/FacilityList';
import ItemList from './components/ItemList';
import CleaningItemList from './components/CleaningItemList';
import useGetCleaningItems from './hooks/useGetCleaningItems';
import useConfirmCleaningItems from './hooks/useConfirmCleaningItems';

export default function CleaningItems({ navigation, route }) {
  const { location, facility, taskId } = route.params;
  const { cleaningItems, loadingItems, task } = useGetCleaningItems(taskId);
  const [selected, setSelected] = useState(false);
  const [itemsToSubmit, setItemsToSubmit] = useState([]);
  const toggleSelect = () => setSelected((prev) => !prev);
  const { confirmCleaningItems, confirming } = useConfirmCleaningItems();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Enter Cleaning Items</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {loadingItems && (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}

        {!loadingItems && cleaningItems.length > 0 && (
          <>
            {cleaningItems.map((items, index) => (
              <CleaningItemList item={items} key={index.toString()} />
            ))}

            <View style={styles.selectible}>
              <TouchableOpacity
                onPress={toggleSelect}
                style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 20,
                  marginRight: 5,
                  backgroundColor: selected ? colors.blue : 'transparent',
                }}
              />
              <Text
                style={{
                  color: '#999999',
                  textAlign: 'center',
                  marginLeft: 5,
                }}>
                The Items and The Quantity Above are Collected by me
              </Text>
            </View>
          </>
        )}

        {!loadingItems && cleaningItems.length == 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: '100%',
                height: 200,
              }}
              source={require('../../assets/images/bro.png')}
            />
            <Text>OOPS! No cleaning items</Text>
          </View>
        )}
      </ScrollView>
      {!loadingItems && cleaningItems.length > 0 ? (
        <View style={{ gap: 10 }}>
          <Button
            isLoading={confirming}
            onPress={async () => {
              if (!selected) {
                return;
              }
              if (
                cleaningItems.filter((item) => item.value == undefined).length >
                0
              ) {
                alert('Pleaase input values');
                return;
              } else {
                const bodyData = {
                  roomId: facility.roomId,
                  cleanerItems: cleaningItems.map((cleaningItem) => {
                    return {
                      cleaning_id: cleaningItem.cleaning_id,
                      quantityReceived: cleaningItem.value,
                    };
                  }),
                };
                const confirmed = await confirmCleaningItems(bodyData, taskId);

                if (confirmed) {
                  navigation.navigate('Summary', {
                    facility,
                    location,
                    cleanerItems: cleaningItems.map((cleaningItem) => {
                      return {
                        quantityReceived: cleaningItem.value,
                        name: cleaningItem.item_name,
                      };
                    }),
                    taskId,
                  });
                } else {
                  console.log('lll');
                }
              }

              // confirmCleaningItems(bodyData, task.id);
            }}
            style={{
              marginTop: 'auto',
              marginBottom: 30,
              opacity: selected ? 1 : 0.4,
            }}
            label="Next"
          />
          <Button
            fontStyle={{
              color: colors.blue,
            }}
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: colors.blue,
            }}
            onPress={() => {
              navigation.navigate('RequestItems', {
                taskId,
                facility,
                location,
              });
            }}
            label="Request Cleaning Items"
          />
        </View>
      ) : (
        <View
          style={{
            gap: 10,
          }}>
          <Button
            fontStyle={{
              color: colors.blue,
            }}
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: colors.blue,
            }}
            onPress={() => {
              navigation.navigate('RequestItems', {
                taskId,
                facility,
                location,
              });
            }}
            label="Request Cleaning Items"
          />

          <Button
            onPress={() => {
              navigation.navigate('Summary', {
                facility,
                location,
                cleanerItems: cleaningItems.map((cleaningItem) => {
                  return {
                    quantityReceived: cleaningItem.value,
                    name: cleaningItem.item_name,
                  };
                }),
                taskId,
              });
            }}
            label="Next"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  haeding: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  image: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 10,
  },
  menu: {
    height: 250,
    width: '100%',
    marginTop: 50,
  },
  innerImage: {
    height: 200,
    width: '100%',
  },
  label: {
    color: colors.blue,
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectible: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
