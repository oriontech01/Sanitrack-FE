import { React, useContext, useState, useEffect } from "react";
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
import colors from "../../util/colors";
import { UserContext } from "../../context/UserContext";
import CheckBox from "../CheckBox";
import Nav from "../Nav";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { RoomContext } from "../../context/RoomContext";
import * as DocumentPicker from "expo-document-picker";
// import { SANITRACK_API_URI, CLOUDINARY_URI } from "@env";
import JWT from "expo-jwt";
// import { JWT_KEY } from "@env";


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

const InspectorRooms = ({ route, navigation }) => {
  const { user, userRole } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const { roomID } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState(false); // Renders ActivityIndicator to show that the app is loading content
  const [roomDetails, setRoomDetails] = useState([]); // Set the details of rooms assigned to the user
  const [modalVisible, setModalVisible] = useState(false); //Handle modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Handle selected image

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  useEffect(() => {
    // If user's role is cleaner, then make this network request
    // Else make network request to get data for inspector dashboard
    setIsLoading(true); // Start loading
    const decodedToken = JWT.decode(user.token, "SANITRACK")
    const getTasks = async () => {
      try {
        const res = await axios.get(
          `https://sanitrack-service.onrender.com/api/cleaner-dashboard/room-details/${roomID}`,
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
          `https://sanitrack-service.onrender.com/api/inspector/room-details/${roomID}`,
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
    if (userRole == "Cleaner") {
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
      ) : (
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
      )
      }
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
export default InspectorRooms;