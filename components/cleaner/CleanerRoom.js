import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Item from "../Item";
import Nav from "../Nav";

export default function CleanerRoom({ route, navigation }) {
  const [details, setDetails] = useState([]);
  const [stopTime, setStopTime] = useState(0); // Timer value for tracking
  const [timer, setTimer] = useState(0); // Implementation of timer feature
  const { user } = useContext(UserContext);
  const roomId = route.params.roomId;
  const taskId = route.params.taskId;
  const [isSubmitted, setIsSubmitted] = useState(false); // To track whether images are being submitted
  const [fileInputs, setFileInputs] = useState([]); // Uploaded files
  const [isActive, setIsActive] = useState(false); // Timer state variable
  const countRef = useRef(null); // Timer reference

  // console.log("Task ID", taskId)

  const takePicture = async () => {
    // No options are needed by default, but you can specify them if necessary
    let result = await ImagePicker.launchCameraAsync({
      // Specify any options here
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      // For this example, we're just logging the URI to the console
      console.log(result.uri);
      // If you want to upload the image, you can do so here
      // uploadImage(result.uri);
    }
  };
  const requestCameraPermission = async () => {
    // Camera roll permission is not required for launching the camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      console.log("Camera permission given");
      takePicture();
    } else {
      console.log("Camera permission denied");
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(
          `https://sanitrack-node-api.onrender.com/api/cleaner-dashboard/room-task?roomId=${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(res.data);
        setDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);

  const uploadImage = async (detailId, file) => {
    try {
      const photo = {
        uri: file.assets[0].uri,
        type: file.assets[0].mimeType,
        name: file.assets[0].name,
      };
      let data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "img_upload");
      data.append("cloud_name", "dyh4orev5");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dyh4orev5/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newFileInput = {
        detail_id: detailId,
        image_path: response.data.secure_url,
      };

      // Correctly updating the state and logging the updated value
      setFileInputs(prevFileInputs => {
        const updatedFileInputs = [...prevFileInputs, newFileInput];
        console.log("New File Inputs", updatedFileInputs); // This will log the updated state
        return updatedFileInputs;
      });

      // Now, post the newFileInput to your API
      const res = await axios.post(
        "https://sanitrack-node-api.onrender.com/api/cleaner-dashboard/room-details",
        [newFileInput],
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status === 200) {
        Alert.alert("Upload", "Upload was successful!");
      } else {
        console.error("Upload failed with status:", res.status);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload error", error.message);
      return false;
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setTimer(0); // Reset timer to zero when starting
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    const timeWorked = timer; // Store the current timer value in a local variable
    setStopTime(timeWorked); // Update stopTime state with the current timer value
    setTimer(0); // Reset timer to zero

    // Format the time worked and display in alert
    const formattedTimeWorked = formatTime(timeWorked);
    Alert.alert("Time Worked", `Time worked: ${formattedTimeWorked}`);
    console.log("final time", timeWorked); // Logs the formatted time worked
  };

  const formatTime = (timeVal) => {
    const getSeconds = `0${timeVal % 60}`.slice(-2);
    const minutes = `${Math.floor(timeVal / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timeVal / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleSubmit = async () => {
    console.log("File inputs", fileInputs);

    // if (timer < 60) {
    //   Alert.alert(
    //     "Error",
    //     "You must work for at least 5 minutes before submitting"
    //   );
    //   return;
    // }

    if (fileInputs.length < 1) {
      Alert.alert("Submission Error", "You must upload at least one file");
      return;
    }
    const timerDetails = {
      //Construct timer data for backend API
      roomId,
      start_time: formatTime(timer),
      stop_time: formatTime(stopTime),
    };
    console.log(timerDetails);
    setIsSubmitted(true);
    try {
      const response = await axios.post(
        `https://sanitrack-node-api.onrender.com/api/task/submit?taskId=${taskId}`,
        timerDetails,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Submit", response.data);
      Alert.alert("Success", "Submission successful!");
      setIsSubmitted(true);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const styles = StyleSheet.create({
    cleanerContainer: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: "center",
      paddingTop: 20,
    },
    timerContainer: {
      flexDirection: "row",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "space-around",
      width: "80%",
    },
    timerText: {
      fontSize: 24,
      color: colors.darkblue,
      fontWeight: "bold",
    },
    button: {
      backgroundColor: colors.bgColor,
      padding: 15,
      borderRadius: 30,
      width: "30%",
      alignItems: "center",
      margin: 10,
    },
    buttonText: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: colors.secondary,
      padding: 20,
      borderRadius: 30,
      width: "80%",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 20,
    },
    submitButtonText: {
      color: colors.black,
      fontSize: 20,
      fontWeight: "bold",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.itemBgColor,
      padding: 20,
      borderRadius: 10,
      width: "90%",
      marginVertical: 5,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    itemText: {
      fontSize: 18,
      color: colors.black,
      fontWeight: "normal",
    },
    itemUploadSuccessful: {
      backgroundColor: colors.selectedColor,
    },
  });
  return (
    <View style={styles.cleanerContainer}>
      <Nav name={user.username} />
      <View style={styles.timerContainer}>
        <Icon name="timer-outline" size={24} color={colors.black} />
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={isActive ? handleStop : handleStart}
        >
          <Text style={styles.buttonText}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
      </View>
      {details.map((detail, index) => (
        <Item
          key={index}
          label={detail.name.toUpperCase()}
          detailId={detail._id}
          uploadImage={uploadImage}
        />
      ))}
      {isSubmitted === false ? (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate("WorkOrderSelection");
          }}
        >
          <Text style={styles.submitButtonText}>CLOSE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}