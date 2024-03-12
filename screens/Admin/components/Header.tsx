import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import { ArrowLeftIcon } from '../../../assets/svg/Index';
import colors from '../../../util/colors';

export default function Header({
  navigation,
  withBack = true,
  withAdd = false,
  onAdd,
  label = '',
}) {
  return (
    <View style={styles.topBar}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => {
          if (!withBack) {
            return;
          }
          navigation.goBack();
        }}
        style={styles.arrow}>
        {withBack && <ArrowLeftIcon />}
        <Text style={styles.haeding}>{label}</Text>
      </TouchableOpacity>

      {withAdd && (
        <TouchableOpacity onPress={onAdd}>
          <Text style={{ fontSize: 24, color: '#999999' }}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  haeding: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },

  topBar: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  arrow: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
