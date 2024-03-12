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

import colors from '../../util/colors';

import { ArrowLeftIcon } from '../../assets/svg/Index';
import Input from '../../components/general/Input';
import RequestItem from './components/RequestItem';
import Button from '../../components/general/Button';
import ConfirmRequestItem from './components/ConfirmRequestItem';
import useRequestCleaningItems from './hooks/useRequestCleaningItems';

export default function RequestSummary({ navigation, route }) {
  const { data } = route.params;
  const { taskId, location, facility, allSelectedItems } = JSON.parse(data);
  const { requestCleaningItems, requesting } = useRequestCleaningItems();
  const [allselected, setAllSelected] = useState(allSelectedItems);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Cleaning Items</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {allselected.map((item, index) => (
          <ConfirmRequestItem setAll={setAllSelected} item={item} key={index} />
        ))}
      </ScrollView>
      <Button
        isLoading={requesting}
        onPress={async () => {
          const bodyData = {
            requestedCleaningData: allselected.map((item, index) => {
              return {
                cleaning_id: item._id,
                item_name: item.equipment,
                asking_quantity: item.requiredQuantity,
                comment: item.comment,
                unit: item.unit,
              };
            }),
          };

          const confirmed = await requestCleaningItems(bodyData, taskId);
          if (confirmed) {
            alert('Successfully Requested Cleaning Items');
            navigation.navigate('CleaningItems', {
              location,
              facility,
              taskId,
            });
          } else {
            alert('Error Requesting Cleaning Items');
          }
        }}
        label="Request Cleaning Items"
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
