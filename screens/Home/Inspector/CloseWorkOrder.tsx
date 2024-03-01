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
  QrCode,
} from '../../../assets/svg/Index';

import CleaningItemList from '../components/CleaningItemList';
import useGetCleaningItems from '../hooks/useGetCleaningItems';
import useConfirmCleaningItems from '../hooks/useConfirmCleaningItems';
import useGetTaskSummary from '../hooks/useGetTaskSummary';
import ConfirmItems from '../components/ConfirmItems';

export default function CloseWorkOrder({ navigation, route }) {
  const { location, facility, id } = route.params;
  const { cleaningItems, task } = useGetCleaningItems(id);
  const [selected, setSelected] = useState(false);
  const [itemsToSubmit, setItemsToSubmit] = useState([]);
  const toggleSelect = () => setSelected((prev) => !prev);
  const { summary, loadingSummary } = useGetTaskSummary(id);
  const { confirmCleaningItems, confirming } = useConfirmCleaningItems();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Confirm Cleaning Items</Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {loadingSummary && (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={colors.blue} />
          </View>
        )}

        {!loadingSummary &&
          summary?.cleaningItems.cleaning_items.length > 0 && (
            <>
              {summary?.cleaningItems.cleaning_items.map((items, index) => (
                <ConfirmItems item={items} key={index.toString()} />
              ))}
            </>
          )}
      </ScrollView>
      <Button
        onPress={() => {
          navigation.navigate('Success');
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
