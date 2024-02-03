import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import colors from "./../../util/colors";
import Nav from "../Nav";

export default function CleanerDashboard({ navigation }) {
  const { user } = useContext(UserContext);
  const [taskLocation, setTaskLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRoomLocation = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://sanitrack-service.onrender.com/api/cleaner-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setTaskLocation(res.data.data);
      } catch (error) {
        console.error("Error fetching room location:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRoomLocation();
  }, []);

  const styles = StyleSheet.create({
    roomLocation: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: "center",
      padding: 20,
    },
    location: {
      borderWidth: 1,
      marginTop: 10,
      borderColor: colors.secondary,
      backgroundColor: colors.itemBgColor,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      width: "90%",
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    locationText: {
      color: colors.darkblue,
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 10,
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
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : taskLocation.length > 0 ? (
        taskLocation.map((location) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CleanerTasks", { locationId: location.id })
            }
            key={location.id}
            style={styles.location}
            activeOpacity={0.7}
          >
            <Text style={styles.locationText}> {location.country}, {location.state}, {location.city} </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.locationText}>No tasks available</Text>
      )}
    </View>
  );
}