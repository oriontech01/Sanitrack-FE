import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../../util/colors";
import AddNewItemModal from "./AddNewItemModal";


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
    fontSize: 15,
    color: colors.lightgray,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgray,
  },
  itemName: {
    fontSize: 25,
    color: colors.blue,
  },
  documentContainer: {
    backgroundColor: colors.themeOrange,
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 16,
    margin: 16,
    alignItems: "center",
    height: 110,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pdfContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 8,
  },
  documentTitle: {
    fontWeight: "bold",
    color: colors.black,
  },
  pdfText: {
    fontWeight: "bold",
    color: colors.themeDarkOrange,
    marginRight: 8,
    marginTop: 10,
  },
  removeText: {
    color: colors.themeDarkOrange,
    fontSize: 15,
  },
  list: {
    marginBottom: 0,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
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
const LocationFacilityDetails = ({ route, navigation }) => {
  const { facilityDetails, roomName } = route.params;
  const [isUploaded, setIsUploaded] = useState(false); // State mgt for uploaded pdfs
  const [visible, setVisible] = useState(false);

  // This render function is for the items in the facility
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AddNewItemModal visible={visible} onClose={() => setVisible(false)} />
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
        <Text style={styles.header}>{roomName}</Text>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Ionicons name="add" size={24} color={colors.lightgray} />
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>
        Number Of Items In {roomName}: {facilityDetails.detail.length}
      </Text>
      {isUploaded ? (
        <View style={styles.documentContainer}>
          <View>
            <Text style={styles.documentTitle}>Cleaning Instructions</Text>
            <Text style={styles.pdfText}>Document.PDF</Text>
          </View>

          <View style={styles.pdfContainer}>
            <TouchableOpacity
              onPress={() => {
                /* handleRemovePdf */
              }}
            >
              <MaterialIcons
                name="cancel"
                size={30}
                color={colors.themeDarkOrange}
              />
            </TouchableOpacity>
            <Text style={styles.removeText}>Remove PDF</Text>
          </View>
        </View>
      ) : (
        <View style={styles.documentContainer}>
          <TouchableOpacity
            style={{
              marginLeft: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <MaterialIcons
              name="upload-file"
              color={colors.themeDarkOrange}
              size={30}
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.removeText}>Upload PDF</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={facilityDetails.detail}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
    </View>
  );
};

export default LocationFacilityDetails;
