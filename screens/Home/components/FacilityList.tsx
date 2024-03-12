import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../../util/colors';
import { ArrowLeftIcon } from '../../../assets/svg/Index';
import { useNavigation } from '@react-navigation/native';

export default function FacilityList({ title = '', detail = '', onPress }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <View style={{ width: '80%' }}>
        <Text style={{ color: colors.blue, marginBottom: 5 }}>{title}</Text>
        {detail && <Text>{detail}</Text>}
      </View>

      <View style={{ transform: [{ rotate: '180deg' }] }}>
        <ArrowLeftIcon />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 69,
    width: '100%',
    backgroundColor: '#EBF0FF',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
