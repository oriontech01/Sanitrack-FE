import React, { useEffect } from 'react';
import Lottie from 'lottie-react-native';

import { BackHandler, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useFocusEffect } from '@react-navigation/native';
import Button from '../../../components/general/Button';
import colors from '../../../util/colors';

export default function SuccessScree({ navigation }) {
  //   useFocusEffect(() => {
  //     const onBackPress = () => {
  //       return true;
  //     };

  //     // Add event listener for hardware back button
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     // Clean up function to remove the event listener when the component unmounts
  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     };
  //   });

  return (
    <View style={styles.container}>
      <Lottie
        style={styles.lottie}
        source={require('../../../assets/lottie/success.json')}
        autoPlay
        loop={false}
      />
      <Text
        style={{
          color: colors.blue,
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Work Order Created Successfuly
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#999999',
        }}>
        Your work order has been submitted
      </Text>

      <Button
        onPress={() => navigation.navigate('AdminWorkorderHome')}
        style={{
          marginTop: 'auto',
          marginBottom: 100,
        }}
        label="Finish"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  lottie: {
    height: 218,
    marginTop: 'auto',
  },
});
