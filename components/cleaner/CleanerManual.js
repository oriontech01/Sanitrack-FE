import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Platform, TouchableWithoutFeedback, Linking } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo
import colors from "../../util/colors";

export default function CleanerManual() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfs, setPdfs] = useState([
    { id: 1, name: "User Manual 1", uri: "https://files.eric.ed.gov/fulltext/ED536788.pdf" }, // Replace with your PDF details
    { id: 2, name: "User Manual 2", uri: "https://files.eric.ed.gov/fulltext/ED536788.pdf" }, // Replace with your PDF details
    // Add more PDFs as needed
  ]);

  const handleOpenPDF = async (pdfUri) => {
    // Open the selected PDF in a PDF viewer app
    try {
      Linking.openURL(pdfUri)
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
    },
    button: {
      backgroundColor: colors.secondary,
      padding: 10,
      borderRadius: 10,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonText: {
      color: colors.black,
      fontSize: 16,
      fontWeight: "bold",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      height: "50%",
      gap: 10,
    },
    modalHeader:{
        fontSize: 20
    },
    pdfItem: {
      flexDirection: 'row',
      backgroundColor: "rgba(255, 0, 0, 0.2)", // Light red theme
      alignItems: 'center',
      marginBottom: 10,
      paddingVertical: 10,
      borderRadius: 10,
      paddingLeft: 10,
    },
    pdfIcon: {
      marginRight: 10,
    },
    pdfName: {
      fontSize: 16,
      color: colors.black,
    },
    manualText: {
      color: colors.white,
      fontSize: 18,
      marginVertical: 10,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.manualText}>Click here to view the user manual for this location:</Text>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>View Documents</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>User Manuals</Text>
                <FlatList
                  data={pdfs}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.pdfItem}
                      onPress={() => {
                        setSelectedPDF(item.uri);
                        handleOpenPDF(item.uri);
                      }}
                    >
                      <MaterialIcons name="description" size={24} color={colors.black} style={styles.pdfIcon} />
                      <Text style={styles.pdfName}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
