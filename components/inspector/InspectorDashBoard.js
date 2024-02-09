import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import colors from "./../../util/colors";
import Nav from "../Nav";
import Constants from "expo-constants"
export default function InspectorDashBoard({ navigation }) {
  const { user } = useContext(UserContext);
  const [taskLocation, setTaskLocation] = useState([]);

  useEffect(() => {
    const getRoomLocation = async () => {
      try {
        const res = await axios.get(
          `${Constants.expoConfig.extra.baseUrl}inspector`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setTaskLocation(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching room location:", error);
        Alert.alert("Error", "Failed to fetch room location");
      }
    };
    getRoomLocation();
  }, []);

  const styles = StyleSheet.create({
    roomLocation: {
      flex: 1,
      backgroundColor: colors.primary, // Use a soothing background color
      alignItems: "center", // Center items horizontally
      padding: 20,
    },
    location: {
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      borderColor: colors.secondary, // Subtle border color for elegance
      backgroundColor: colors.itemBgColor, // Softer background for each location item
      padding: 15,
      borderRadius: 10, // Rounded corners for a modern look
      marginBottom: 10, // Space between location items
      width: "100%", // Ensure items don't stretch too wide
      shadowColor: colors.black, // Shadow for a subtle depth effect
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5, // Android elevation
      justifyContent: "space-between", // Distribute space between items
      alignItems: "center", // Vertically align items
    },
    locationText: {
      color: colors.darkblue, // Contrast color for readability
      fontSize: 18, // Slightly larger font for better readability
      fontWeight: "bold", // Bold font for emphasis
      marginRight: 10,
      // Removing marginBottom to allow for inline display
    },
    header: {
      fontSize: 30,
      color: colors.white,
      fontWeight: 'bold',
      marginTop: 20
    }
  });

  return (
    <View style={styles.roomLocation}>
      <Nav name={user.username} />
      <Text style={styles.header}>Work Locations</Text>
      {taskLocation.length > 0 ? (
        taskLocation.map((location, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("InspectorTasks", { locationId: location.id })
            }
            key={location.id}
            style={styles.location}
            activeOpacity={0.7} // Slightly dims the button on press for feedback
          >
            <Text>{index + 1}.</Text>
            <Text style={styles.locationText}> {location.country}, {location.state}, {location.city} </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.locationText}>No tasks available</Text>
      )}
    </View>
  );
}