import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../util/colors";
import AddLocation from "./AddLocation";
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  item: {
    backgroundColor: colors.lightblue,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10, // adjust the border radius as needed
  },
  title: {
    fontSize: 18,
    color: colors.blue,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 20,
  },
  listHeader: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 20,
  },
});
export default function LocationListView({ locationData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  const renderItem = ({ item }) => {
    return (
      <LocationItem
        state={item.state}
        city={item.city}
        onPress={() =>  navigation.navigate("LocationDetails", {locationId: item._id, locationName: `${item.state} - ${item.city} `})}
      />
    );
  };
  const LocationItem = ({ onPress, state, city }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{`${state} - ${city}`}</Text>
        <Ionicons name="chevron-forward-outline" size={24} color={colors.lightgray} />
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <AddLocation isOpen={modalVisible} onRequestClose={() => setModalVisible(false)} />
      <FlatList
        data={locationData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.header}>Locations</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {/* <Ionicons name="globe" size={30} color={colors.lightgray} /> */}
              <TouchableOpacity onPress={() => {
                  setModalVisible(true)
                  console.log("MODAL STATE", modalVisible)
                }
              }>
                <Ionicons name="add" size={30} color={colors.lightgray} />
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
}
