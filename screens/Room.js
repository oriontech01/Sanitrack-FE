import { React, useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Ensure you have installed react-native-vector-icons
import colors from "../util/colors";
import { UserContext } from "../context/UserContext";
import CheckBox from "../components/CheckBox";
import Nav from "../components/Nav";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { RoomContext } from "../context/RoomContext";
import * as DocumentPicker from "expo-document-picker";
import { SANITRACK_API_URI, CLOUDINARY_URI } from "@env";
import JWT from "expo-jwt";
import { JWT_KEY } from "@env";

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
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingTop: 50,
  },
  fullScreenContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: colors.black 
  },
  fullScreenImage: {
      width: screen.width * .9,
      height: screen.height * .5,
      alignSelf: 'center',
      borderRadius: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the children horizontally
    margin: 20,
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
    textAlign: "center", // Ensure text is centered within the wrapper
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  timerText: {
    color: colors.black,
    fontSize: 24,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "#5C6BC0",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.itemBgColor,
    width: "100%",
    height: 59,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemUploadSuccessful: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.itemBgColor,
    width: "100%",
    height: 59,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "green",
  },
  itemText: {
    color: colors.black,
    fontSize: 24,
    flexGrow: 1,
  },
  submitButton: {
    backgroundColor: colors.darkblue,
    padding: 20,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 50,
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 20,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  backArrow: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  supervisorContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  itemsGrid: {
    display: "flex",
    flexDirection: "row", // Align children in a row
    flexWrap: "wrap", // Allow items to wrap to the next line
    justifyContent: "space-around", // Distribute extra space evenly
    alignContent: "center",
    alignItems: "flex-start", // Align items to the start of the cross axis
    width: "100%", // Take the full width of the container
    height: screen.height * 0.7,
    padding: 10,
  },
  supervisedItem: {
    width: "50%", // Take half of the container's width to fit 2 items per row
    display: "flex",
    justifyContent: "center", // Center the content inside the item
    alignItems: "center", // Center the content along the cross axis
    padding: 10, // Provide some space inside the items
    alignContent: "center",
    gap: 10,
    height: screen.height * 0.3,
  },
  itemImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  supervisedItemLabel: {
    marginTop: 8,
    fontSize: 16,
    color: colors.white,
    textAlign: "left",
  },
  supervisedItemFooter: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  uploadButton: {
    marginLeft: 10,
  },
});
const Item = ({ label, detailId, uploadImage }) => {
  const [isUploaded, setIsUploaded] = useState(false);
  return (
    <View style={styles.itemsContainer}>
      <View style={isUploaded ? styles.itemUploadSuccessful : styles.item}>
        <Text style={styles.itemText}>{label}</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => requestCameraPermission()}
        >
          <Icon name="cloud-upload" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const file = await DocumentPicker.getDocumentAsync({
              type: "*/*", // All file types
            });
            if (file.type !== "cancel") {
              uploadImage(detailId, file);
              setIsUploaded(true);
            }
          }}
          style={styles.uploadButton}
        >
          <Icon name="file-upload" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Room = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const { roomID } = useContext(RoomContext);
  const [timer, setTimer] = useState(0); // Implementation of timer feature
  const [isActive, setIsActive] = useState(false); // Timer state variable
  const countRef = useRef(null); // Timer reference
  const [isLoading, setIsLoading] = useState(false); // Renders ActivityIndicator to show that the app is loading content
  const [roomDetails, setRoomDetails] = useState([]); // Set the details of rooms assigned to the user
  const [isSubmitted, setIsSubmitted] = useState(false); // To track whether images are being submitted
  const [fileInputs, setFileInputs] = useState([]); // Uploaded files
  const [modalVisible, setModalVisible] = useState(false); //Handle modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Handle selected image
  const [stopTime, setstopTime] = useState(0) // Timer value for tracking

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const uploadImage = async (detailId, file) => {
    try {
      const photo = {
        uri: file.assets[0].uri,
        type: file.assets[0].mimeType,
        name: file.assets[0].name,
      };

      let data = new FormData();
      data.append("file", photo);
      data.append("upload_preset", "img_upload"); // Unsigned preset
      data.append("cloud_name", "dyh4orev5");

      // Make the upload request to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dyh4orev5/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Construct the new object
      const newFileInput = {
        detail_id: detailId,
        image_path: response.data.secure_url,
      };
      await axios.post("https://sanitrack-node-api.onrender.com/api/cleaner-dashboard/room-details", newFileInput)
      // Update state with the new object
      setFileInputs((prevFileInputs) => [...prevFileInputs, newFileInput]);
      Alert.alert("Upload", "Upload was successful!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload error", error.message);
    }
  };

  const handleSubmit = async () => {
    // console.log("File inputs", fileInputs);
    if (timer < 300) {
      Alert.alert("Error", "You must work for at least 5 minutes before submitting");
      return;
    }

    if(fileInputs.length < 1){
      Alert.alert("Submission Error", "You must upload at least one file")
    }
    const timerDetails = { //Construct timer data for backend API
      roomID,
      start_time: timer,
      stop_time: stopTime,
      task_id
    }
    try {
      const response = await axios.post(
        `https://sanitrack-node-api.onrender.com/api/cleaner-dashboard/room-details`,
        fileInputs,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("Submit",response.data);
      Alert.alert("Success", "Submission successful!");
      setIsSubmitted(true);
    } catch (error) {
      Alert.alert("Error", error.message);
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
    setstopTime(timeWorked); // Update stopTime state with the current timer value
    setTimer(0); // Reset timer to zero
  
    // Format the time worked and display in alert
    const formattedTimeWorked = formatTime(timeWorked);
    Alert.alert("Time Worked", `Time worked: ${formattedTimeWorked}`);
    console.log("final time", timeWorked); // Logs the formatted time worked
  };
  
  
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  useEffect(() => {
    // If user's role is cleaner, then make this network request
    // Else make network request to get data for inspector dashboard
    setIsLoading(true); // Start loading
    const decodedToken = JWT.decode(user.token, JWT_KEY)
    const getTasks = async () => {
      try {
        const res = await axios.get(
          `https://sanitrack-node-api.onrender.com/api/cleaner-dashboard/room-details/${roomID}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (res.status === 200) {
          console.log("Tasks",res.data)
          setTasks(res.data.data || []);
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
        console.log(error)
        setIsLoading(false);
      }
    };
    const getInspectorRoomDetails = async () => {
      try {
        const res = await axios.get(
          `https://sanitrack-node-api.onrender.com/api/inspector/room-details/${roomID}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (res.status === 200) {
          setRoomDetails(res.data.data.tasks);
          console.log("Task data", res.data.data.tasks);
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert("Error", error.message);
        setIsLoading(false);
      }
    };
    if (decodedToken.role_id.role_name === "Cleaner") {
      getTasks();
    } else {
      getInspectorRoomDetails();
    }
  }, [user.token]);

  return (
    <View style={styles.container}>
      <Nav name={user.username} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <Icon name="arrow-left" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerText}>{route.params.roomName}</Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : user.role === "inspector" ? (
        <View style={styles.supervisorContainer}>
          <View style={styles.itemsGrid}>
            {roomDetails &&
              roomDetails.map((task, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openModal(task.image_url)}
                    style={styles.supervisedItem}
                  >
                    <Image
                      source={{
                        uri: task.image_url,
                      }}
                      style={styles.itemImage}
                    />
                    <View style={styles.supervisedItemFooter}>
                      <Text style={styles.supervisedItemLabel}>
                        {task.name.toUpperCase()}
                      </Text>
                      <CheckBox />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.fullScreenContainer}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
              />
            </TouchableOpacity>
          </Modal>
        </View>
      ) : (
        <View style={styles.cleanerContainer}>
          <View style={styles.timerContainer}>
            <Icon name="timer-outline" size={24} color={colors.black} />
            <Text style={styles.timerText}>{formatTime()}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={isActive ? handleStop : handleStart}
            >
              <Text style={styles.buttonText}>
                {isActive ? "STOP" : "START"}
              </Text>
            </TouchableOpacity>
          </View>
          {tasks.map((task, index) => (
            <Item
              key={index}
              label={task.name.toUpperCase()}
              detailId={task._id}
              uploadImage={uploadImage}
            />
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          handleSubmit();
        }}
      >
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Room;