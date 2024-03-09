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
import { UserContext } from '../../../context/UserContext';
import AppText from '../../../components/AppText';
import colors from '../../../util/colors';
import Select from '../../../components/general/Select';
import Button from '../../../components/general/Button';
import {
  ArrowLeftIcon,
  EyeScan,
  Location,
  LocationIcon,
  QrCode,
} from '../../../assets/svg/Index';

import CleaningItemList from '../components/CleaningItemList';
import useGetCleaningItems from '../hooks/useGetCleaningItems';
import useConfirmCleaningItems from '../hooks/useConfirmCleaningItems';
import useGetTaskSummary from '../hooks/useGetTaskSummary';
import ConfirmItems from '../components/ConfirmItems';
import useCloseWorkOrder from '../hooks/useCloseWorkOrder';
import useGetOrderItems from '../hooks/useGetOrderItems';

export default function CloseWorkOrder({ navigation, route }) {
  const { id } = route.params;

  const { summary, loadingSummary } = useGetTaskSummary(id);
  const { items, loadingItems } = useGetOrderItems(id);

  const { closeWorkOrder, closing } = useCloseWorkOrder();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Confirm Cleaning Items</Text>
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

        {!loadingItems && items.length > 0 && (
          <>
            {items.map((items, index) => {
              items.damaged = false;
              items.damagedQuantity = '';
              return <ConfirmItems item={items} key={index.toString()} />;
            })}
          </>
        )}
        {!loadingItems && items.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',

              height: 400,
            }}>
            <LocationIcon />
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              All Items Are Confirmed!
            </Text>
          </View>
        )}
      </ScrollView>
      <Button
        isLoading={closing}
        onPress={async () => {
          const bodyData = {
            cleaningItemsData: items.map((item) => {
              return {
                cleaning_id: item.cleaning_id,
                quantity: item.quantity,
                damaged: item.damaged,
                damaged_quantity: item.damagedQuantity,
              };
            }),
          };
          const confirmed = await closeWorkOrder(bodyData, id);
          if (confirmed) {
            navigation.navigate('Success');
          }
        }}
        label="Close work order"
      />
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
