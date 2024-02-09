import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import Material Community Icons
import colors from "../util/colors";

export default function UserGuideWiki() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.userGuideButton}>
          <MaterialCommunityIcons name="help-circle" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.modalText}>Welcome to Sanitrack Mobile!</Text>
              <Text style={styles.sectionHeader}>Cleaner</Text>
              <Text style={styles.modalText}>
                As a cleaner, your main responsibilities include:
              </Text>

              <Text style={styles.modalText}>
                • Logging in to the app and accessing your work orders.
              </Text>
              <Text style={styles.modalText}>
                • Navigating to tasks, which are organized based on location.
              </Text>
              <Text style={styles.modalText}>
                • Completing assigned tasks and uploading evidence associated
                with each task.
              </Text>
              <Text style={styles.modalText}>
                • Submitting completed tasks for review and approval by your
                assigned inspector.
              </Text>

              <Text style={styles.sectionHeader}>Inspector</Text>
              <Text style={styles.modalText}>
                As an inspector, your primary duties involve:
              </Text>
              <Text style={styles.modalText}>
                • Accessing tasks assigned to you for supervision from your
                dashboard.
              </Text>
              <Text style={styles.modalText}>
                • Reviewing tasks completed by assigned cleaners.
              </Text>
              <Text style={styles.modalText}>
                • Approving tasks as required based on your assessment.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  userGuideButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.darkblue,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 30,
  },
});
