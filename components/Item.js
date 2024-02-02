import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../util/colors";
import * as DocumentPicker from "expo-document-picker";

const Item = ({ label, detailId, uploadImage }) => {
  const [isUploaded, setIsUploaded] = useState(false);

  const requestCameraPermission = async () => {
    // Your implementation for requesting camera permission and handling the response
  };

  return (
    <View style={itemStyles.itemsContainer}>
      <View style={isUploaded ? itemStyles.itemUploadSuccessful : itemStyles.item}>
        <Text style={itemStyles.itemText}>{label}</Text>
        <TouchableOpacity
          style={itemStyles.uploadButton}
          onPress={requestCameraPermission}
        >
          <Icon name="cloud-upload" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const file = await DocumentPicker.getDocumentAsync({
              type: "*/*", // All file types
            });
            if (file.type !== "cancel") {
              const result = uploadImage(detailId, file);
              if (result) setIsUploaded(true);
              else Alert.alert("Upload Error", "Upload failed, please try again")
            }
          }}
          style={itemStyles.uploadButton}
        >
          <Icon name="file-upload" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:  colors.lightgray,
    width: "100%",
    height: 59,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemUploadSuccessful: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgColor,
    width: "100%",
    height: 59,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemText: {
    color: colors.black,
    fontSize: 24,
    flexGrow: 1,
  },
  uploadButton: {
    marginLeft: 10,
  },
});

export default Item;
