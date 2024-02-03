import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Nav from "../Nav";
import colors from "../../util/colors"; // Ensure you have a colors object defined in your project

export default function CleanerTasks({ route, navigation }) {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const locationId = route.params.locationId;

  useEffect(() => {
    setIsLoading(true);
    const getTasksForLocation = async () => {
      try {
        const res = await axios.get(
          `https://sanitrack-service.onrender.com/api/cleaner-dashboard/rooms?locationId=${locationId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setTasks(res.data.data.cleanerRooms || []);
      } catch (error) {
        console.error("Error fetching room location:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (locationId) {
      getTasksForLocation();
    }
  }, [locationId, user.token]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 20,
    },
    task: {
      backgroundColor: colors.itemBgColor,
      marginTop: 20,
      padding: 20,
      borderRadius: 10,
      width: '90%',
      marginBottom: 10,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    taskText: {
      color: colors.darkblue,
      fontSize: 18,
      fontWeight: "bold",
    }
  });

  return (
    <View style={styles.container}>
      <Nav name={user.username} />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={styles.task}
            onPress={() => navigation.navigate("CleanerRoom", { roomId: task.roomId })}
          >
            <Text style={styles.taskText}>{task.roomName}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};