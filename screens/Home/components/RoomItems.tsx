import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../../util/colors';
import { Camera as CameraIcon, Trash } from '../../../assets/svg/Index';
import { Camera, CameraType } from 'expo-camera';
import Button from '../../../components/general/Button';

export default function RoomItems() {
  const [type, setType] = useState(CameraType.back);
  const [capture, setCapture] = useState(false);
  const [camera, setCamera] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
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
        <Text style={{ fontSize: 16, color: colors.blue }}>RoomItems</Text>
        <TouchableOpacity
          onPress={() => {
            setCapture(true);
            setModalVisible(true);
          }}
          activeOpacity={0.7}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CameraIcon />
          <Text style={styles.font}>Upload Picture</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.cameraModal}>
            <View style={styles.mainCamera}>
              {imageUri && (
                <>
                  <Image
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
                    <Button
                      onPress={() => {
                        setImageUri(null);
                      }}
                      style={{ ...styles.button, backgroundColor: '#AF6D31' }}
                      label="Retake"
                    />
                  </View>
                </>
              )}

              {capture && !imageUri && (
                <>
                  <TouchableOpacity
                    onPress={takePicture}
                    style={styles.captureButton}
                  />
                  <Camera
                    ref={(ref) => setCamera(ref)}
                    style={styles.camera}
                    type={type}></Camera>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>

      {imageUri && (
        <View style={styles.imageDetail}>
          <TouchableOpacity
            onPress={() => {
              setCapture(true);
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

          <TouchableOpacity
            onPress={() => {
              setImageUri(null);
            }}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Trash />
            <Text style={[styles.font, { color: '#6D0808' }]}>
              Delete Picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    width: '45%',
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
