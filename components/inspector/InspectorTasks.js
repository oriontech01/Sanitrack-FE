import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Nav from "../Nav";

export default function CleanerTasks({ route, navigation }) {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]); // Initialized as an empty array
  const locationId = route.params.locationId;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary, // Use the app's background color for consistency
      alignItems: "center",
      justifyContent: "flex-start", // Align items to the top
      paddingTop: 20, // Add some padding at the top
    },
    task: {
      backgroundColor: colors.itemBgColor, // Background color for each task
      marginTop: 20,
      padding: 20, // Add some padding inside each task for spacing
      borderRadius: 10, // Rounded corners for a modern look
      width: "90%", // Make tasks take up most of the container width
      marginBottom: 10, // Space between tasks
      shadowColor: colors.black, // Shadow for depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Android elevation for shadow
    },
    taskText: {
      color: colors.darkblue, // Text color for the task details
      fontSize: 18, // Font size for readability
      fontWeight: "bold", // Make the task name stand out
    },
  });

  useEffect(() => {
    const getTasksForLocation = async () => {
      try {
        const res = await axios.get(
          `https://sanitrack-service.onrender.com/api/inspector/room-task?roomId=${locationId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("Tasks fetched:", res.data.data.cleanerRooms); // Log to check the fetched data
        setTasks(res.data.data.cleanerRooms || []); // Ensure tasks is always set to an array
      } catch (error) {
        console.error("Error fetching room location:", error);
      }
    };
    if (locationId) {
      // Check if locationId is present
      getTasksForLocation();
    } else {
      console.log("Location ID is not available");
    }
  }, [locationId]); // Depend on locationId to refetch if it changes

  // Ensure that tasks is an array before rendering
  return (
    <View style={styles.container}>
      <Nav name={user.username} />
      <Text
        style={{
          fontSize: 30,
          marginTop: 20,
          fontWeight: "bold",
          color: colors.white,
        }}
      >
        Assigned Rooms
      </Text>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={styles.task}
            onPress={() => {
              navigation.navigate("InspectorRoom", {
                roomId: task.roomId,
                taskId: task.taskId,
              });
            }}
          >
            <Text style={styles.taskText}>{task.roomName}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noTasksText}>No assigned rooms available.</Text>
      )}
    </View>
  );
}