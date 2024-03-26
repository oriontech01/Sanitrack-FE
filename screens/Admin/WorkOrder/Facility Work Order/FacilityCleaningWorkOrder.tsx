import {
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import FacilityList from "../../../Home/components/FacilityList";
import useLocation from "../../hooks/useLocations";
import colors from "../../../../util/colors";
import useTask from "../../hooks/useTask";

export default function FacilityCleaningWorkOrder({ navigation }) {
  const { getLocation, loading: loadingLocation, allLocations } = useLocation();
  const { getWorkOrderFacilities, assignedFacilities } = useTask();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getLocation();
    getWorkOrderFacilities();
    //   getTask();
  }, []);



  console.log(assignedFacilities);
  return (
    <SafeAreaView style={{ flex: 1, backfaceVisibility: "#fff" }}>
      <View style={styles.container}>
        <Header
          label="Assigned Facility Timing"
          withAdd={true}
          withBack={false}
          onAdd={() => {
            navigation.navigate("SelectNewWorkOrder");
          }}
          navigation={navigation}
        />
        <Text>Select a facility to view timer details.</Text>
        {loadingLocation && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 200,
            }}
          >
            <ActivityIndicator color={colors.blue} />
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {!loadingLocation && (
            <>
              {assignedFacilities.map((facility, ind) => (
                <FacilityList
                  key={ind.toString()}
                  title={facility.facility_id ? facility.facility_id.facility_name : `MSS Facility ${ind + 1}`}
                  detail={facility.facility_id !== null ? `${facility.facility_id.state} - ${facility.facility_id.country}` : 'No Facility ID available'}
                  onPress={() => {
                     navigation.navigate("FacilityTimerDetails", {
                       facilityTimerData: facility
                     })
                  }}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>

      {/* <Modal animationType="slide" transparent={true} visible={modalVisible2}>
          <View style={styles.overLay}>
            <View style={styles.content}>
             
          </View>
        </Modal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  overLay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxHeight: Dimensions.get("window").height / 1.4,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
  },
});
