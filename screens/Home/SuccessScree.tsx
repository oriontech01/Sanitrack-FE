import React, { useEffect } from 'react';
import Lottie from 'lottie-react-native';

import { BackHandler, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import colors from '../../util/colors';
import Button from '../../components/general/Button';
import { useFocusEffect } from '@react-navigation/native';

export default function SuccessScree({ navigation }) {
  const navigate = useNavigation();
  useFocusEffect(() => {
    const onBackPress = () => {
      return true;
    };

    // Add event listener for hardware back button
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Clean up function to remove the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  });

  return (
    <View style={styles.container}>
      <Lottie
        style={styles.lottie}
        source={require('../../assets/lottie/success.json')}
        autoPlay
        loop={false}
      />
      <Text
        style={{
          color: colors.blue,
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        Task Submited Successfuly
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#999999',
        }}>
        Your Task has been recorded Successfuly
      </Text>

      <Button
        onPress={() => navigate.navigate('HomeIndex')}
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
  },
  lottie: {
    height: 218,
    marginTop: 'auto',
  },
});
