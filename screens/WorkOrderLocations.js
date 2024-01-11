import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import colors from '../util/colors';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkpurple,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      gap: 50
    },
    userContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      padding: 10,
      borderRadius: 20,
      justifyContent: 'space-between',
      marginTop: 20,
      alignItems: 'center',
    },
    userText: {
      marginLeft: 10,
      color: colors.white,
      fontSize: 20,
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
    const rooms = ['ROOM A', 'ROOM B', 'ROOM C', 'ROOM D'];
    const navigateToRoom = (roomName) => {
      navigation.navigate('Room', { roomName });
    };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
         <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
           <Icon name="account-circle-outline" size={40} color={colors.black}  />
           <Text style={styles.userText}>HELLO USER!</Text>
         </View>
         <Icon name="bell-outline" size={22} color={colors.white} />
      </View>
      <View style={styles.roomContainer}>
      {
         rooms.map((room, index) => {
            return (
          <TouchableOpacity key={index} style={styles.button} onPress={() => {
            navigateToRoom(room)
          }}>
            <Text style={styles.buttonText}>{room}</Text>
          </TouchableOpacity>
            )
         })
      }
      </View>
    </View>
  );
};



export default WorkOrderLocations;
