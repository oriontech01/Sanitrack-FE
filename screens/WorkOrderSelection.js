import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../util/colors";
import { UserContext } from "../context/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignContent: "center",
    gap: 120,
    padding: 20,
  },
  workOrderButtons: {
    backgroundColor: colors.white,
    width: "100%",
    height: 150,
    padding: 25,
    borderRadius: 50,
    alignItems: "center", // Changed from alignContent for correct alignment
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 20,
    lineHeight: 30,
  },
});
const WorkOrderSelection = ({ navigation }) => {
  const { userRole } = useContext(UserContext);
  return (
    <View style={styles.container}>
    {/* <Text>Work Order Selection</Text> */}
      <TouchableOpacity
        style={styles.workOrderButtons}
        onPress={() => navigation.navigate("BarCode")}
      >
        <Text style={styles.buttonText}>SCAN BARCODE TO VIEW WORK ORDER</Text>
      </TouchableOpacity>
      {userRole === "Cleaner" ? (
        <TouchableOpacity
          style={styles.workOrderButtons}
          onPress={() => navigation.navigate("CleanerDashboard")}
        >
          <Text style={styles.buttonText}>SELECT FROM LIST</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.workOrderButtons}
          onPress={() => navigation.navigate("InspectorDashboard")}
        >
          <Text style={styles.buttonText}>SELECT FROM LIST</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WorkOrderSelection;