import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { cityData, countryData } from "../../../constants/locationData";
import colors from "../../../util/colors";
import useLocation from "../../../Hooks/useLocation";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  addLocationModal: {
    backgroundColor: colors.white,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.blue,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.5, // 50% of screen height
    backgroundColor: colors.white,
    borderRadius: 20, // Optional: for rounded corners
    padding: 20, // Optional: for internal padding
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

const AddLocation = ({ isOpen, onRequestClose }) => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { addLocation } = useLocation();

  // Update states when country changes
  useEffect(() => {
    setStates(countryData[country] || []);
    setState("");
  }, [country]);

  // Update cities when state changes
  useEffect(() => {
    setCities(cityData[state] || []);
    setCity("");
  }, [state]);

  const handleSubmit = () => {
    // Handle submission logic here
    addLocation(country, state, city, postalCode);
    setCity('')
    setCountry('')
    setPostalCode('')
    setState('')
    console.log({country, state, city, postalCode})
    onRequestClose();
  };

  return (
    <Modal
      visible={isOpen}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="slide"
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => onRequestClose()}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <Text style={styles.modalHeader}>Add a New Facility Location</Text>
          <View style={{ marginBottom: 30, height: "90%" }}>
            <Picker
              style={styles.input}
              selectedValue={country}
              onValueChange={(value) => setCountry(value)}
            >
              <Picker.Item label="Select Country" value="" />
              {Object.keys(countryData).map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
            <Picker
              style={styles.input}
              selectedValue={state}
              onValueChange={(value) => setState(value)}
              enabled={!!country}
            >
              <Picker.Item label="Select State/Province" value="" />
              {states.map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>
            <Picker
              style={styles.input}
              selectedValue={city}
              onValueChange={(value) => setCity(value)}
              enabled={!!state}
            >
              <Picker.Item label="Select City" value="" />
              {cities.map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={(value) => setPostalCode(value)}
            />
            <Button
              title="Add Location"
              onPress={handleSubmit}
              disabled={!country || !state || !city || !postalCode}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddLocation;
