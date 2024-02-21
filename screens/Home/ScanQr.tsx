import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Banned } from '../../assets/svg/Index';
import Button from '../../components/general/Button';
import colors from '../../util/colors';

export default function ScanQr({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [askingPermission, setaskingPermission] = useState(true);
  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    setHasPermission(status === 'granted');
    setaskingPermission(false);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if (data) {
      navigation.navigate('ItemsToClean');
    }
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);
  return (
    <View style={styles.container}>
      {hasPermission === null && (
        <View style={styles.notPermited}>
          <Banned />
          <Text
            style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 20 }}>
            Permision Not Granted
          </Text>

          <Button
            onPress={askForCameraPermission}
            label="Request For Permission"
          />
        </View>
      )}
      {askingPermission && (
        <View style={styles.notPermited}>
          <ActivityIndicator color={colors.blue} />
        </View>
      )}

      {hasPermission && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#000',
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notPermited: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
