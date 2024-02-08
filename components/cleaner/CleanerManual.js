// CleanerManual.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../util/colors";

export default function CleanerManual() {
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
    },
    button: {
      backgroundColor: colors.secondary, // Assuming you have a secondary color
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
    manualText: {
      color: colors.white,
      fontSize: 18,
      marginVertical: 10,
    },
  });
// Remember to add a modal which will display a list of pdfs uploaded by Admin, so when a user clicks on one, he gets redirected to pdf viewer to view the pdf 
  return (
    <View style={styles.container}>
      <Text style={styles.manualText}>Click here to view the user manual for this location:</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View documents</Text>
      </TouchableOpacity>
    </View>
  );
}
