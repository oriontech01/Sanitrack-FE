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
import useGetAllCleaningItems from './hooks/useGetAllCleaningItems';

export default function RequestCleaningItems({ navigation, route }) {
  const { taskId, facility, location } = route.params;
  const [allSelectedItems, setAllSelectedItems] = useState([]);
  const { items, loadingItems } = useGetAllCleaningItems();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Cleaning Items</Text>
      </TouchableOpacity>
      <Input label="Search here" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
        {!loadingItems && (
          <>
            {items.map((item, index) => (
              <RequestItem
                item={item}
                key={index.toString()}
                addToSelect={setAllSelectedItems}
              />
            ))}
          </>
        )}
      </ScrollView>
      <Button
        onPress={() => {
          navigation.navigate('RequestSummary', {
            data: JSON.stringify({
              allSelectedItems,
              taskId,
              facility,
              location,
            }),
          });
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
