import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import Button from "../../../../components/general/Button";
import Select from "../../../../components/general/Select";
import Header from "../../components/Header";
import useCleaner from "../../hooks/useCleaner";
import useLoading from "../../../general_hooks/useLoading";
import colors from "../../../../util/colors";
import MultipleSelect from "../../../../components/general/MultippleSelect";
import { useSharedValue } from "react-native-reanimated";
import useTaskDetails from "../../hooks/useTaskDetails";
import Input from "../../../../components/general/Input";

const SelectCleanersWorkOrder = ({ navigation, route }) => {
  const { getCleaners, allCleaner } = useCleaner();
  const { startLoading, stopLoading, loading } = useLoading();
  const [selectedCleaner, setSelectedCleaner] = useState([]);
  const borderWidthValue = useSharedValue(0);
  const { getCleaningItems, cleaningItems } = useTaskDetails();
  const [selectedCleaningItems, setSelectedCleaningItems] = useState([]);
  const {
    selectedRooms,
    facilityData,
    facility_id,
    selectedRoomDetails,
    workOrderFacilityId,
  } = route.params;
  const [assetsToClean, setAssetsToClean] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [cleaningData, setCleaningData] = useState([]); // This will be updated when cleaning inventory required for the task is set
  useEffect(() => {
    const getAllCleaners = async () => {
      startLoading();
      try {
        await getCleaners();
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };
    getAllCleaners();
  }, []);

  useEffect(() => {
    const fetchCleaningItems = async () => {
      startLoading();
      try {
        await getCleaningItems();
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };
    fetchCleaningItems();
  }, []);

  const cleanerOptions = allCleaner.map((cleaner) => {
    return { value: cleaner._id, label: cleaner.username };
  });
  const cleaningItemsOptions = cleaningItems.map((item) => {
    return { label: item.equipment, value: item.equipment };
  });
  const roomOptions = selectedRoomDetails.map((room) => {
    return { value: room._id, label: room.roomName };
  });

  const handleSelectCleaningItems = (selected) => {
    // Update selected cleaning items state
    const selectedItems = selected.values.map((item) => ({
      cleaning_id: item._id,
      item_name: item.label,
      quantity: "", // Initialize quantity as empty
      unit: item.unit,
    }));
    setSelectedCleaningItems(selectedItems);
  };

  const handleSelectedCleaner = (selected) => {
    console.log("Selected Cleaner:", selected);
    const cleanerIds = selected.values.map((cleaner) => {
      return cleaner.value;
    });
    // console.log("QUICK FIX", cleanerIds);
    setSelectedCleaner([...cleanerIds]);
  };
  const handleSelectedAssets = (selected) => {
    const assets = selected.values.map((asset) => {
      return asset.value;
    });
    setAssetsToClean([...assets]);
  };

  const handleSelectRoom = (selected) => {
    console.log(selected.value);
    const selectedRoom = selectedRoomDetails.find(
      (room) => room._id === selected.value
    );
    const selectedRoomAssetOptions = selectedRoom.detail.detail.map((item) => {
      return { value: item.name, label: item.name };
    });
    console.log("Happy", selectedRoomAssetOptions);
    setAssetOptions(selectedRoomAssetOptions);
  };

  const handleQuantityChange = (itemId, quantity) => {
    const updatedItems = selectedCleaningItems.map((item) =>
      item.cleaning_id === itemId ? { ...item, quantity: quantity } : item
    );
    setSelectedCleaningItems(updatedItems);
  };

  const handleSubmit = () => {
    setCleaningData(selectedCleaningItems);
    console.log("Selected cleaning data:", selectedCleaningItems);
    console.log("Go to the next step", {
      facility_id,
      assigned_cleaner: selectedCleaner,
    });
  };

  return loading ? (
    <ActivityIndicator color={colors.blue} />
  ) : (
    <ScrollView style={styles.container}>
      <Header
        label="Select Cleaners"
        withAdd={false}
        withBack={true}
        onAdd={() => {
          console.log("Add something");
        }}
        navigation={navigation}
      />
      <MultipleSelect
        style={styles.select}
        options={cleanerOptions}
        onSelect={handleSelectedCleaner}
        borderWidthValue={borderWidthValue}
        label="Select Cleaners"
        placeHolder="Enter here"
      />
      <MultipleSelect
        style={styles.select}
        options={cleaningItemsOptions}
        onSelect={handleSelectCleaningItems}
        borderWidthValue={borderWidthValue}
        label="Select Cleaning Items"
        placeHolder="Enter here"
      />
      <Select
        style={styles.select}
        options={roomOptions}
        onSelect={handleSelectRoom}
        label="Select Specific Room"
        placeHolder="Enter here"
      />
      <MultipleSelect
        style={styles.select}
        options={assetOptions}
        onSelect={handleSelectedAssets}
        borderWidthValue={borderWidthValue}
        label="Select Assets To Clean"
        placeHolder="Enter here"
      />
      {selectedCleaningItems.map((item) => (
        <Input
          key={item.cleaning_id}
          label={`Quantity for ${item.item_name}`}
          placeholder="Enter Quantity"
          value={item.quantity}
          onChange={(text) => handleQuantityChange(item.cleaning_id, text)}
          type="numeric" // Assuming quantity is numeric
          style={styles.input}
        />
      ))}
      <Button
        style={{ marginBottom: 20 }}
        label="Submit"
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: "100%",
  },
  input: {
    paddingBottom: 20,
  },
  select: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default SelectCleanersWorkOrder;
