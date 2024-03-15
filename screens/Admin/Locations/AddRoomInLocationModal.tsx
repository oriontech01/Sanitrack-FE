import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Button from "../../../components/general/Button";
import colors from "../../../util/colors";
import Select from "../../../components/general/Select";
import useLocation from "../../../Hooks/useLocation";
import useRoom from "../../../Hooks/useRoom";
const AddRoomInLocationModal = ({ visible, onClose }) => {
  const [formData, setFormData] = useState({
    roomName: "",
    location_id: "",
    details: [{ name: "" }],
  });
  const { getLocation, allLocations } = useLocation();
  const { addRoom } = useRoom();

  const options = allLocations.map((location) => {
    return {
      label: `${location.country} - ${location.state} - ${location.city}`,
      value: location._id,
    };
  });

  useEffect(() => {
    const fetchLocation = async () => {
      await getLocation();
    };
    fetchLocation();
  }, []);

  const handleInputChange = (index, value) => {
    const newDetails = [...formData.details];
    newDetails[index] = { ...newDetails[index], name: value }; // Create a new copy of the object
    setFormData({
      ...formData,
      details: newDetails,
    });
  };
  

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { name: "" }],
    });
  };

  const handleRemoveDetail = (index) => {
    const newDetails = [...formData.details];
    newDetails.splice(index, 1);
    setFormData({
      ...formData,
      details: newDetails,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    addRoom(formData)
    Alert.alert("Success", "You have successfully added a room")
    onClose()
    // Handle submission
    //  Example: onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableOpacity activeOpacity={1} onPress={() => onClose()}>
        <TouchableOpacity activeOpacity={1}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: colors.blue }}
              >
                Add Room
              </Text>
              <TextInput
                placeholder="Room Name"
                value={formData.roomName}
                onChangeText={(text) =>
                  setFormData({ ...formData, roomName: text })
                }
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  width: "100%",
                }}
              />
              {/* Location selection */}
              <Select
                options={options}
                label="Select a location"
                onSelect={(val) => {
                  console.log(val);
                  setFormData({
                    ...formData,
                    location_id: val.value,
                  });
                }}
              />
              {/* Details input */}
              {formData.details.map((detail, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Item Name"
                    value={detail.name}
                    onChangeText={(text) => handleInputChange(index, text)}
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      borderRadius: 5,
                      padding: 10,
                      flex: 1,
                      marginRight: 10,
                      marginTop: 10
                    }}
                  />
                  {index > 0 && (
                    <TouchableOpacity onPress={() => handleRemoveDetail(index)}>
                      <Text style={{ color: "red" }}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <Button
                label="Add Another Item +"
                onPress={handleAddDetail}
                style={{ marginBottom: 10 }}
              />
              <Button label="Submit" disabled={formData.details.length === 0 || formData.location_id  === '' || formData.roomName === ''} onPress={handleSubmit} />
              <Button
                label="Close"
                style={{ backgroundColor: colors.red, marginTop: 10 }}
                onPress={onClose}
              />
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddRoomInLocationModal;
