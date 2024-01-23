import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import colors from '../util/colors';

const screen = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary
    },
    button: {
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: colors.white,
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20
    },
   barCodeContainer: {
      flex: 1,
      alignContent: 'center',
      padding: 20,
      justifyContent: 'center',
      gap: 10
   },
   barCode: {
      width: screen.width * .9,
      height: screen.height * .5
   }
  });
  
const BarcodeScannerComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Scanned Barcode: ${data}`);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <View style={styles.barCodeContainer}>
            <TouchableOpacity onPress={askForCameraPermission} style={styles.button}>
              <Image source={require('../assets/images/barcode.png')} style={styles.barCode}/>
            </TouchableOpacity>  
            <Text style={styles.buttonText}>SCAN QR CODE TO VIEW WORK ORDER</Text>
        </View>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default BarcodeScannerComponent;

