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
import colors from '../../../util/colors';
import { Camera as CameraIcon, Trash } from '../../../assets/svg/Index';
import { Camera, CameraType } from 'expo-camera';
import Button from '../../../components/general/Button';
import axios from 'axios';
import useUploadTask from '../hooks/useUploadTask';

export default function RoomItems({
  item,
  fileInputs,
  setFileInputs,
  taskId,
  startedTime,
  done,
}) {
  const [type, setType] = useState(CameraType.back);
  const [capture, setCapture] = useState(false);
  const [camera, setCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [base64Url, setBase64Url] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { uploadTask, uploading } = useUploadTask();

  const uploadImage = async (detailId) => {
    try {
      setUploadingImage(true);
      const photo = {
        uri: imageUri,
      };
      let base64Img = `data:image/jpg;base64,${base64Url}`;
      let data = {
        file: base64Img,
        upload_preset: 'img_upload',
      };

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dyh4orev5/upload`,
        data,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      setUploadingImage(false);

      if (response.status == 200) {
        const newFileInput = {
          detail_id: detailId,
          image_path: response.data.secure_url,
        };

        // Correctly updating the state and logging the updated value
        setFileInputs((prevFileInputs) => {
          const updatedFileInputs = [...prevFileInputs, newFileInput];
          return updatedFileInputs;
        });
        const bodyData = {
          inputs: [newFileInput],
        };
        const uploaded = await uploadTask(bodyData, taskId);
        if (uploaded) {
          item.uploaded = true;
          setModalVisible(false);
        }
      }
      setUploaded(true);
      return true;
    } catch (error) {
      setUploadingImage(false);
      alert('OOPS. An ERROR occurred');
      console.error('Upload error:', error);

      return false;
    }
  };
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
      const data = await camera.takePictureAsync({
        base64: true,
        quality: 0.1,

        skipProcessing: true, // Skip extra processing
        pictureSize: 'Low', // Adjust picture size if necessary
        autoFocus: 'off', // Disable auto-focus
        flashMode: 'off', // Disable flash
        orientation: 'auto', // Set auto orientation
      });
      setBase64Url(data.base64);
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
        <TouchableOpacity
          onPress={() => {
            if (startedTime == 0 && !done) {
              alert('Please Start Your Timer!');
              return;
            }
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
                      isLoading={uploadingImage || uploading}
                      onPress={() => {
                        if (uploaded) {
                          setModalVisible(false);
                          return;
                        }
                        uploadImage(item._id);
                      }}
                      style={styles.button}
                      label={uploaded ? 'Close' : 'Proceed'}
                    />
                    <Button
                      onPress={() => {
                        setImageUri(null);
                        setUploaded(false);
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
                View
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setImageUri(null);
              item.uploaded = false;
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