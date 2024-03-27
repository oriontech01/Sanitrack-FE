import { View, Text, Dimensions, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import FacilityList from "../../../Home/components/FacilityList";
import useLoading from "../../../general_hooks/useLoading";
import useTask from "../../hooks/useTask";

// Get the screen's width and height
const { width, height } = Dimensions.get("window");

export default function SelectNewWorkOrder({ navigation }) {
  const { startLoading, stopLoading, loading } = useLoading();
  const { getPreSavedWorkOrders, preSavedWO } = useTask();

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getPreSavedWorkOrders();
      stopLoading();
    };
    fetchData();
  }, []);

  console.log("Presaved", preSavedWO);
  return (
    <View style={styles.container}>
      <Header
        label="Assign Facility Timer"
        withAdd={true}
        withBack={true}
        onAdd={() => {
          navigation.navigate("AllFacilities");
        }}
        navigation={navigation}
      />
      <Text style={styles.selectText}>Select from existing timers.</Text>
      <View style={styles.listContainer}>
        {preSavedWO.map((template) => {
          const facilityName =
            template.facility_id?.facility_name || "MSS Facility";
          const facilityDetail = template.facility_id
            ? `${template.facility_id.country} - ${template.facility_id.state} - ${template.facility_id.city}`
            : "MSS Facility timer";

          return (
            <FacilityList
              key={template._id}
              title={facilityName}
              detail={facilityDetail}
              onPress={() => {
                navigation.navigate("SelectInspectors", {
                  id: template._id,
                  presavedData: template,
                });
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

// Stylesheet adjusted for responsiveness
const styles = StyleSheet.create({
  container: {
    padding: width * 0.05, // Dynamic padding based on screen width
    height: "100%",
  },
  selectText: {
    paddingLeft: 10,
    paddingTop: height * 0.01, // Dynamic padding top based on screen height
    fontSize: width < 360 ? 14 : 16, // Adjust font size based on screen width
  },
  listContainer: {
    flex: 1,
  },
});
