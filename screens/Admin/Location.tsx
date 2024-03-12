import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../util/colors";

const locations = [
  { id: "1", name: "Discovery Mall" },
  { id: "2", name: "Aso Villa" },
  { id: "3", name: "First Bank, Wuse 2" },
  { id: "4", name: "Aso Villa" },
];

const LocationItem = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.title}>{name}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="gray" />
    </TouchableOpacity>
  );
};

const Location = () => {
  const renderItem = ({ item }) => (
    <LocationItem
      name={item.name}
      onPress={() => console.log("Navigate to location details")}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.header}>Locations</Text>
            <Ionicons name="globe" size={20} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50, // adjust the padding as needed
  },
  item: {
    backgroundColor: colors.primary,
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
    display: 'flex',
    // borderWidth: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 2,
    paddingRight: 20
  }
});

export default Location;
