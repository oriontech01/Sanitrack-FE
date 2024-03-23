import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { cityData, countryData } from "../../../constants/locationData";
import colors from "../../../util/colors";
import useLocation from "../../../Hooks/useLocation";
import Button from "../../../components/general/Button";
import useLoading from "../../general_hooks/useLoading";
import Select from "../../../components/general/Select";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../../components/general/Input";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  addLocationModal: {
    backgroundColor: colors.white,
    padding: 40,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.blue,
    paddingBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.6, // 50% of screen height
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
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
  const { startLoading, stopLoading, loading } = useLoading();

  // Convert countryData and cityData to the expected format for the Select component
  const countryOptions = Object.keys(countryData).map((key) => ({
    label: key,
    value: key,
  }));
  const stateOptions = states.map((state) => ({ label: state, value: state }));
  const cityOptions = cities.map((city) => ({ label: city, value: city }));

  useEffect(() => {
    const updatedStates = countryData[country] || [];
    setStates(updatedStates);
    setState("");
  }, [country]);

  useEffect(() => {
    const updatedCities = cityData[state] || [];
    setCities(updatedCities);
    setCity("");
  }, [state]);

  const handleSelectCountry = (option) => {
    setCountry(option.value);
  };

  const handleSelectState = (option) => {
    setState(option.value);
  };

  const handleSelectCity = (option) => {
    setCity(option.value);
  };

  const handleSubmit = () => {
    startLoading();
    addLocation(country, state, city, postalCode);
    stopLoading();
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
        onPress={onRequestClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.modalHeader}>Add a New Facility Location</Text>
            <View style={{ marginBottom: 30, height: "90%" }}>
              <Select
                options={countryOptions}
                onSelect={handleSelectCountry}
                placeHolder="Select Country"
                label="Country"
              />
              <Select
                options={stateOptions}
                onSelect={handleSelectState}
                placeHolder="Select State/Province"
                label="State/Province"
                style={{ marginTop: 20 }}
              />
              <Select
                options={cityOptions}
                onSelect={handleSelectCity}
                placeHolder="Select City"
                label="City"
                style={{ marginTop: 20 }}
              />
              <Input
                placeholder="Postal Code"
                value={postalCode}
                onChange={setPostalCode}
              />
              <Button
                label="Add Location"
                style={{ marginTop: 20 }}
                onPress={handleSubmit}
                isLoading={loading}
              />
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddLocation;
