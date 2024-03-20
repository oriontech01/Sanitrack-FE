import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MssTabularOverview from '../components/MssTabularOverview';
import { HamburgerMenu } from '../../../assets/svg/Index';
import AppText from '../../../components/AppText';
import colors from '../../../util/colors';

export default function MasterScheduleHome({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <HamburgerMenu />
        </TouchableOpacity>
        <AppText style={styles.heading}>Master Schedule</AppText>
      </View>
      <MssTabularOverview />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 'bold',

    textTransform: 'capitalize',
    marginLeft: 20,
  },
});
