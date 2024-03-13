import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CloseIcon } from "../../../assets/svg/Index";
import colors from "../../../util/colors";
import Select from "../../../components/general/Select";
import useLocation from "../../../Hooks/useLocation";
import useRoom from "../../../Hooks/useRoom";

const AddRoomInLocationModal = ({ visible, onClose }) => {
  const [itemName, setItemName] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const { getLocation, allLocations } = useLocation();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      await getLocation();
    };
    fetchLocation();
  }, []);

  const saveRoom = () => {
    setItemName(""); // Clear the input field
    onClose(); // Close modal after saving
  };

  const options = allLocations.map((location) => {
    return {
      label: `${location.country} - ${location.state} - ${location.city}`,
      value: location._id,
    };
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => onClose()}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          <View style={styles.inputContainer}>
            <Text>Enter Room Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setItemName}
              value={itemName}
              placeholder="Enter a room here"
              autoFocus
            />
            <Select
              options={options}
              label="Select a location"
              onSelect={(val) => {
                console.log(val);
                setSelectedLocationId(val.value);
              }}
            />
          </View>
          {details.map((detail, index) => (
            <View key={index} style={styles.detailInputContainer}>
              <TextInput
                style={styles.detailInput}
                onChangeText={(text) => handleDetailChange(text, index)}
                value={detail.value}
                placeholder="Enter detail"
              />
              {details.length - 1 === index && (
                <TouchableOpacity
                  onPress={handleAddDetail}
                  style={styles.addButton}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              )}
              {details.length !== 1 && (
                <TouchableOpacity
                  onPress={() => handleRemoveDetail(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.saveButton} onPress={saveRoom}>
            <Text style={styles.saveButtonText}>Save Room</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>
              <CloseIcon />
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%", // Set modal width
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    position: "absolute",
    top: 5,
    color: colors.blue,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    padding: 10,
    width: "100%", // Full width of modal
  },
  saveButton: {
    backgroundColor: colors.blue,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    width: "100%", // Full width of modal
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    color: colors.lightgray,
    fontSize: 24,
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
});

export default AddRoomInLocationModal;
