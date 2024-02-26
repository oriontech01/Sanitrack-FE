import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../../../util/colors';
import { Camera as CameraIcon, Trash } from '../../../../assets/svg/Index';
import { Camera, CameraType } from 'expo-camera';
import Button from '../../../../components/general/Button';

export default function InspectorRoomItems({ item }) {
  const [type, setType] = useState(CameraType.back);
  const [capture, setCapture] = useState(false);
  const [camera, setCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
  );

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    if (cameraPermission.status !== 'granted') {
      alert('Permission for media access needed.');
    }
  };
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      setImageUri(data.uri);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: imageUri ? '#FFF7F0' : 'transparent' },
      ]}>
      <View style={styles.camContainer}>
        <Text style={{ fontSize: 16, color: colors.blue }}>{item.name}</Text>
      </View>
      <View style={styles.imageDetail}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: 43,
              width: 84,
              backgroundColor: '#EBF0FF',
              borderWidth: 0.5,
              borderColor: colors.blue,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: colors.blue,
                fontSize: 14,
              }}>
              JPEG
            </Text>
          </View>
          <Text style={[styles.font]}>Image.png</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.cameraModal}>
          <View style={styles.mainCamera}>
            {imageUri && (
              <>
                <Image
                  resizeMode="cover"
                  source={{ uri: imageUri }}
                  style={{
                    height: Dimensions.get('window').height - 300,
                    width: '100%',
                  }}
                />

                <View style={styles.buttons}>
                  <Button
                    onPress={() => setModalVisible(false)}
                    style={styles.button}
                    label="Proceed"
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  camContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 70,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
  font: {
    color: '#737373',
    marginLeft: 5,
  },
  camera: {
    flex: 1,
  },
  cameraModal: {
    height: Dimensions.get('window').height,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainCamera: {
    width: '100%',
    height: Dimensions.get('window').height - 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    marginTop: 'auto',
    padding: 20,
  },
  captureButton: {
    height: 70,
    width: 70,
    backgroundColor: '#B2BEB5',
    position: 'absolute',
    bottom: 0,
    zIndex: 999999999,
    left: Dimensions.get('window').width / 2.5,
    borderRadius: 70,
    marginBottom: 50,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: '90%',
  },
  container: { marginBottom: 20, borderRadius: 10 },
  imageDetail: {
    height: 80,
    width: '100%',
    backgroundColor: '#FFF7F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
