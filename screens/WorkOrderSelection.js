import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../util/colors";
import { UserContext } from "../context/UserContext";
import UserGuideWiki from "../components/UserGuideWiki";
import Nav from "../components/Nav";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  workOrderButtonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  workOrderButtons: {
    backgroundColor: colors.white,
    width: "100%",
    height: 150,
    marginBottom: 20,
    padding: 25,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
  },
  helpIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

const WorkOrderSelection = ({ navigation }) => {
  const { userRole, user } = useContext(UserContext);
  return (
    <View style={styles.container}>
    <Nav name={user.username} />
      <View style={styles.workOrderButtonsContainer}>
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
      <TouchableOpacity style={styles.helpIcon}>
        <UserGuideWiki />
      </TouchableOpacity>
    </View>
  );
};

export default WorkOrderSelection;
