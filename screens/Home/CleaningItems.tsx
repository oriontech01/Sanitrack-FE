import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
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

export default function CleaningItems({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topBar}>
        <ArrowLeftIcon />
        <Text style={styles.haeding}>Enter Cleaning Items</Text>
      </TouchableOpacity>

      <CleaningItemList />
      <CleaningItemList />
      <CleaningItemList />

      <Button
        onPress={() => navigation.navigate('Summary')}
        style={{
          marginTop: 'auto',
          marginBottom: 30,
        }}
        label="Next"
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
});
