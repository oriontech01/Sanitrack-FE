import React, {useContext, useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import colors from '../util/colors';
import Nav from '../components/Nav';
import { RoomContext } from '../context/RoomContext';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkpurple,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      gap: 50
    },
    button: {
      backgroundColor: '#9FA8DA',
      padding: 15,
      borderRadius: 30,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      color: colors.black,
      fontWeight: 'bold',
      fontSize: 25
    },
    roomContainer: {
        display: 'flex',
        flex: 1,
        gap: 15,
        width: '100%'
    },
  });
  const WorkOrderLocations = ({navigation}) => {
    const {user} = useContext(UserContext);
    const {setRoomID} = useContext(RoomContext)
    const [roomList, setRoomList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      setIsLoading(true)
      const getDashboard = async () => {
        try {
          if(user.role === 'cleaner'){
            const res = await axios.get('http://https://sanitrack-service.onrender.com/:5000/api/cleaner-dashboard', {
              headers: {
                Authorization: `Bearer ${user.token}`
              }
            });
            if (res.status === 200) {
              // Ensure roomList is always an array
              setRoomList(res.data.data.cleanerRooms || []);
              setIsLoading(false)
            }
          }
          else{
             try {
              const res = await axios.get('http://https://sanitrack-service.onrender.com/:5000/api/inspector', {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
              });
              if (res.status === 200) {
                // Ensure roomList is always an array
                setRoomList(res.data.data.inspectorRooms || []);
                setIsLoading(false)
              }
              console.log(res.data.data.inspectorRooms)
             } catch (error) {
               Alert.alert('Error', error.message)
               setIsLoading(false)
             }
          }
        } catch (error) {
          Alert.alert('Error', error.message)
          setIsLoading(false)
        }
      };
      getDashboard();
    }, [user.token]); // Add user.token as a dependency
    const navigateToRoom = (roomName) => {
      navigation.navigate('Room', { roomName });
    };
    return (
      <View style={styles.container}>
        <Nav name={user.username}/>
        <View style={styles.roomContainer}>
          { 
            isLoading ?  <ActivityIndicator size="large" color="#ffffff" /> :
            roomList.map((room, index) => (
              <TouchableOpacity key={index} style={styles.button} onPress={() => {
                   setRoomID(room.roomId)
                   navigateToRoom(room.roomName)
                }
              }>
                <Text style={styles.buttonText}>{room.roomName}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    );
  };
export default WorkOrderLocations;