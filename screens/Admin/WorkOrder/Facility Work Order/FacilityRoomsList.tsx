import React, { useEffect, useState } from "react";
import useRoom from "../../hooks/useRoom";
import useLoading from "../../../general_hooks/useLoading";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import colors from "../../../../util/colors";
import Header from "../../components/Header";
import Button from "../../../../components/general/Button";
import CheckBox from "../../../../components/CheckBox";

export default function FacilityRoomsList({ route, navigation }) {
  const { facilityData, id, workOrderFacilityId } = route.params;
  const { getUnassignedRoomById, allUnassignedRoomsById } = useRoom();
  const { startLoading, stopLoading, loading } = useLoading();
  const [selectedRooms, setSelectedRooms] = useState([]);

  console.log("dhhjdjvbdvb", workOrderFacilityId)

  useEffect(() => {
    const fetchUnAssignedRooms = async () => {
      startLoading();
      await getUnassignedRoomById(id);
      stopLoading();
    };
    fetchUnAssignedRooms();
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color={colors.blue} />
  ) : (
    <View style={styles.container}>
      <Header
        label="Set Work Order"
        withAdd={false}
        withBack={true}
        onBack={() => navigation.goBack()}
        navigation={navigation}
      />
      <ScrollView>
        {allUnassignedRoomsById?.map((room) => (
          <View key={room.id} style={styles.roomContainer}>
            <Text style={styles.roomText}>{room.roomName}</Text>
            <CheckBox
              handleSelection={() => {
                console.log(room._id);
                setSelectedRooms([...selectedRooms, room._id]);
                console.log(selectedRooms);
              }}
            />
          </View>
        ))}
      </ScrollView>
      <Button
        label="Submit"
        onPress={() => {
          console.log("Selected rooms: ", selectedRooms);
          const selectedRoomDetails = allUnassignedRoomsById.filter((room) =>
            selectedRooms.includes(room._id)
          );

          console.log("Selected rooms details: ", selectedRoomDetails);

          navigation.navigate("SelectCleaners", {
            selectedRooms,
            facilityData,
            facility_id,
            selectedRoomDetails,
            workOrderFacilityId
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white, // Replace with your actual background color
  },
  roomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightgray,
    backgroundColor: "#EBF0FF",
    marginBottom: 16,
  },
  roomText: {
    fontSize: 18,
    color: colors.blue,
  },
});
