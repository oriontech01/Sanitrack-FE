import {React, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you have installed react-native-vector-icons
import colors from '../util/colors';
import { AuthContext } from '../context/AuthContext';
import CheckBox from '../components/CheckBox';
import Nav from '../components/Nav';
import * as ImagePicker from 'expo-image-picker';

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
      }
  });


const Item = ({ label }) =>{
    return (
    <View style={styles.itemsContainer}>
     <View style={styles.item}>
         <Text style={styles.itemText}>{label}</Text>
         <TouchableOpacity onPress={() => requestCameraPermission()}>
           <Icon name="cloud-upload" size={24} color={colors.black} />
         </TouchableOpacity>
     </View>
  </View>
  )
 } 
const Room = ({route, navigation}) => {
  const {username} = useContext(AuthContext)
  return (
    <View style={styles.container}>
       <Nav name={username}/>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                <Icon name="arrow-left" size={24} color={colors.black} />
            </TouchableOpacity>
            <View style={styles.headerTitleWrapper}>
                <Text style={styles.headerText}>{route.params.roomName}</Text>
            </View>
        </View>
        {
           username === 'Supervisor' ?
           <View style={styles.supervisorContainer}>
              <View style={styles.itemsGrid}>
                <View style={styles.supervisedItem}>
                  <Image source={require("../assets/images/chair.png")} style={styles.itemImage} />
                  <View style={styles.supervisedItemFooter}>
                    <Text style={styles.supervisedItemLabel}>Chair</Text>
                    <CheckBox/>
                  </View>
                </View>
                <View style={styles.supervisedItem}>
                  <Image source={require("../assets/images/table.png")} style={styles.itemImage} />
                  <View style={styles.supervisedItemFooter}>
                    <Text style={styles.supervisedItemLabel}>Table</Text>
                    <CheckBox/>
                  </View>
                </View>
                <View style={styles.supervisedItem}>
                  <Image
                    source={require("../assets/images/mattress.png")}
                    style={styles.itemImage}
                  />
                  <View style={styles.supervisedItemFooter}>
                    <Text style={styles.supervisedItemLabel}>Mattress</Text>
                    <CheckBox/>
                  </View>
                </View>
                <View style={styles.supervisedItem}>
                  <Image
                    source={require("../assets/images/freezer.png")}
                    style={styles.itemImage}
                  />
                  <View style={styles.supervisedItemFooter}>
                     <Text style={styles.supervisedItemLabel}>Freezer</Text>
                     <CheckBox/>
                  </View>
                </View>
              </View>
            </View>
         : <View style={styles.cleanerContainer}>
              <View style={styles.timerContainer}>
                  <Icon name="timer-outline" size={24} color={colors.black} />
                  <Text style={styles.timerText}>00:00:00</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>START</Text>
                  </TouchableOpacity>
              </View>
                <Item label="FLOOR" />
                <Item label="WINDOWS" />
                <Item label="CURTAINS" />
                <Item label="FURNITURE" />
            </View>
        }
      <TouchableOpacity style={styles.submitButton} onPress={() => Alert.alert('Success!', 'Submitted Successfully')}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Room;