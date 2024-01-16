import {React, useContext, useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Dimensions, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you have installed react-native-vector-icons
import colors from '../util/colors';
import { UserContext } from '../context/UserContext';
import CheckBox from '../components/CheckBox';
import Nav from '../components/Nav';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { RoomContext } from '../context/RoomContext';
import * as DocumentPicker from 'expo-document-picker';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({cloud: {cloudName: 'dyh4orev5'}});
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
  if (status === 'granted') {
    console.log('Camera permission given');
    takePicture();
  } else {
    console.log('Camera permission denied');
  }
};
const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5C6BC0',
      alignItems: 'center',
      paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center the children horizontally
        margin: 20,
    },
    headerText: {
        color: colors.white,
        fontSize: 24,
        textAlign: 'center', // Ensure text is centered within the wrapper
      },
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      justifyContent: 'center'
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
      color: '#5C6BC0',
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.itemBgColor,
      width: '100%',
      height: 59,
      borderRadius: 20,
      paddingLeft: 20,
      paddingRight: 20
    },
    itemText: {
      color: colors.black,
      fontSize: 24,
      flexGrow: 1,
    },
    submitButton: {
      backgroundColor: colors.bgColor,
      padding: 20,
      borderRadius: 30,
      width: '80%',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 50,
      marginTop: 10
    },
    submitButtonText: {
      color: colors.black,
      fontSize: 20,
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
     },
    backArrow: {
        position: 'absolute', 
        left: 0, 
        top: 0,
      },
    headerTitleWrapper: {
        flex: 1, 
        alignItems: 'center', 
      },
    supervisorContainer: {
        backgroundColor: '#5C6BC0',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 20,
      },
      itemsGrid: {
        display: 'flex',
        flexDirection: 'row', // Align children in a row
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'space-around', // Distribute extra space evenly
        alignContent: 'center',
        alignItems: 'flex-start', // Align items to the start of the cross axis
        width: '100%', // Take the full width of the container
        height: screen.height * .70,
        padding: 10,
      },
      supervisedItem: {
        width: '50%', // Take half of the container's width to fit 2 items per row
        display: 'flex',
        justifyContent: 'center', // Center the content inside the item
        alignItems: 'center', // Center the content along the cross axis
        padding: 10, // Provide some space inside the items
        alignContent: 'center',
        gap: 10,
        height: screen.height * .30
      },
      itemImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
        borderRadius: 10
      },
      supervisedItemLabel: {
        marginTop: 8,
        fontSize: 16,
        color: colors.white,
        textAlign: 'left'
      },
      supervisedItemFooter: {
        display: 'flex',
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
      },
      uploadButton: {
        marginLeft: 10,
      }
  });
const Item = ({ label, detailId, handleImageChange }) => {
    return (
    <View style={styles.itemsContainer}>
     <View style={styles.item}>
         <Text style={styles.itemText}>{label}</Text>
         <TouchableOpacity style={styles.uploadButton} onPress={() => requestCameraPermission()}>
           <Icon name="cloud-upload" size={24} color={colors.black} />
         </TouchableOpacity>
         <TouchableOpacity onPress={async () => {
              const file = await DocumentPicker.getDocumentAsync({
                type: '*/*', // All file types
              });
              if (file.type !== 'cancel') {
                handleImageChange(detailId, file);
              }
            }} 
         style={styles.uploadButton}>
              <Icon name="file-upload" size={24} color={colors.black} />
         </TouchableOpacity>
     </View>
  </View>
  )
};
const Room = ({route, navigation}) => {
  const {user} = useContext(UserContext)
  const [tasks, setTasks] = useState([])
  const {roomID} = useContext(RoomContext)
  const [timer, setTimer] = useState(0); // Implementation of timer feature
  const [isActive, setIsActive] = useState(false); // Timer state variable
  const countRef = useRef(null); 
  const [isLoading, setIsLoading] = useState(false) // Renders ActivityIndicator to show that the app is loading content
  const [fileInputs, setFileInputs] = useState({});
  const [roomDetails, setRoomDetails] = useState([])

  const handleImageChange = (detailId, file) => {
    
    setFileInputs((prevFileInputs) => ({
      ...prevFileInputs,
      [detailId]: file
    }));
    Alert.alert("Upload", "Upload was successful!")

    
  };
  // console.log(fileInputs)
  const handleSubmit = async () => {
    const formData = new FormData();
        // Ensure fileInputs is valid and contains files
    if (!fileInputs || Object.keys(fileInputs).length === 0) {
          console.error('No files to upload');
          return;
      }
      
    for (const [detailId, file] of Object.entries(fileInputs)) {    
      if (file.assets && file.assets[0] && file.assets[0].uri) {
        formData.append(detailId, { uri: file.assets[0].uri, type: 'image/jpeg', name: `${detailId}.jpg` });

        
    }
    for (let [key, value] of formData.entries()) { 
      console.log(key, value); 
    }
    // console.log(formData)

    // const cloudinaryUploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dyh4orev5/upload', {
    //   method: 'POST', 
    //   body: formData
    // }).then((res => {
    //   console.log(res.data)
    // }))
    // console.log(cloudinaryUploadResponse.data)
      
    }  
    // console.log("formData", formData._parts)//
        // axios.request({
        //   method: 'post',
        //   data: formData, /* Removed the [] to pass the formData as an object not as an array of object */
        //   url: 'http://https://sanitrack-service.onrender.com/:5000/api/cleaner-dashboard/room-details',
        //   headers: {
        //     'Authorization': `Bearer ${user.token}`,
        //     'Content-Type': 'multipart/form-data'
        //   }
        // }).then((response) => {
        //   console.log(JSON.stringify(response.data))
        // }).catch((error) => {
        //   console.error('Error uploading document:', error);
        //   if (error.response) {
        //       // The server responded with a status code that falls out of the range of 2xx
        //       console.error('Error response data:', error.response.data);
        //       console.error('Error response status:', error.response.status);
        //       console.error('Error response headers:', error.response.headers);
        //   }
        // })
  };
  
  const handleStart = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(countRef.current);
    setIsActive(false);
  };

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  useEffect(() => {
     // If user's role is cleaner, then make this network request
     // Else make network request to get data for inspector dashboard
     setIsLoading(true); // Start loading
     const getTasks = async() =>{
      try {
        const res = await axios.get(`http://https://sanitrack-service.onrender.com/:5000/api/cleaner-dashboard/room-details/${roomID}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        if(res.status === 200){
          // console.log(res.data)
          setTasks(res.data.data.detail || [])   
          setIsLoading(false)
        }
      } catch (error) {
        Alert.alert('Error', error.message)
        setIsLoading(false)
      }
     }
     const getInspectorRoomDetails = async() => {
        try {
          const res = await axios.get(`http://https://sanitrack-service.onrender.com/:5000/api/inspector/room-details/${roomID}`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          if(res.status === 200){
            setRoomDetails(res.data.data.tasks);
            console.log(res.data.data.tasks)
            setIsLoading(false)
          }
        } catch (error) {
           Alert.alert('Error', error.message)
           setIsLoading(false)
        }
     }
    if(user.role === 'cleaner'){
      getTasks()
    }else{
      getInspectorRoomDetails()
    }
  }, [user.token])

  return (
    <View style={styles.container}>
       <Nav name={user.username}/>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                <Icon name="arrow-left" size={24} color={colors.black} />
            </TouchableOpacity>
            <View style={styles.headerTitleWrapper}>
                <Text style={styles.headerText}>{route.params.roomName}</Text>
            </View>
        </View>
        {
        isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" /> // White color ActivityIndicator
       ) :  user.role === 'inspector' ?
           <View style={styles.supervisorContainer}>
              <View style={styles.itemsGrid}>
                  {
                    roomDetails && roomDetails.map((task, index)=>{
                        return <View key={index} style={styles.supervisedItem}>
                                  <Image source={require("../assets/images/chair.png")} style={styles.itemImage} />
                                  <View style={styles.supervisedItemFooter}>
                                    <Text style={styles.supervisedItemLabel}>{(task.name).toUpperCase()}</Text>
                                    <CheckBox/>
                                  </View>
                              </View>
                    })
                  }
              </View>
            </View>
         : <View style={styles.cleanerContainer}>
              <View style={styles.timerContainer}>
                  <Icon name="timer-outline" size={24} color={colors.black} />
                  <Text style={styles.timerText}>{formatTime()}</Text>
                  <TouchableOpacity style={styles.button} onPress={isActive ? handleStop : handleStart}>
                    <Text style={styles.buttonText}>{isActive ? 'STOP' : 'START'}</Text>
                  </TouchableOpacity>
              </View>
              {tasks.map((task, index) => (
                  <Item 
                    key={index} 
                    label={task.name.toUpperCase()} 
                    detailId={task._id}
                    handleImageChange={handleImageChange}
                  />
               ))}
            </View>
        }
      <TouchableOpacity style={styles.submitButton} onPress={() => {
          handleSubmit()
      }}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Room;