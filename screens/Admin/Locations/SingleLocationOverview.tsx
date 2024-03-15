import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../util/colors";
import useRoom from "../../../Hooks/useRoom";
import useLoading from "../../general_hooks/useLoading";
import AddRoomInLocationModal from "./AddRoomInLocationModal";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    color: colors.blue,
  },
  subHeader: {
    fontSize: 16,
    color: colors.lightgray,
    paddingLeft: 16,
    paddingBottom: 16,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 15,
  },
  itemName: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
    color: colors.blue,
  },
  list: {},
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 18,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
  },
});

const SingleLocationOverview = ({ route, navigation }) => {
  const { locationId, locationName } = route.params;
  const { getRoomsByLocationId, singleLocationRooms } = useRoom();
  const { loading, startLoading, stopLoading } = useLoading();
  const [visible, setVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("LocationFacilityDetails", {
          facilityDetails: item.detail,
          roomName: item.roomName,
        })
      }
    >
      <Ionicons name="md-business" size={24} color={colors.blue} />
      <Text style={styles.itemName}>{item.roomName}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color={colors.lightgray}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    const getSingleLocationData = async () => {
      startLoading();
      try {
        await getRoomsByLocationId(locationId);
      } catch (error) {
        console.log(error);
      }
      stopLoading();
    };
    getSingleLocationData();
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator color={colors.blue} size={"large"} />
      ) : (
        <View style={styles.container}>
          <AddRoomInLocationModal
            visible={visible}
            onClose={() => setVisible(false)}
          />
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={colors.lightgray}
              />
            </TouchableOpacity>
            <Text style={styles.header}>{locationName}</Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Ionicons name="add" size={24} color={colors.lightgray} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subHeader}>
            Number Of Facilities: {singleLocationRooms.length}
          </Text>
          <FlatList
            data={singleLocationRooms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      )}
    </>
  );
};

export default SingleLocationOverview;
