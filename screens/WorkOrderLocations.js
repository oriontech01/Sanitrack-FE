import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import colors from '../util/colors';
import Nav from '../components/Nav';

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
    const {username} = useContext(AuthContext)
    const rooms = ['ROOM A', 'ROOM B', 'ROOM C', 'ROOM D'];
    const navigateToRoom = (roomName) => {
      navigation.navigate('Room', { roomName });
    };

  return (
    <View style={styles.container}>
      <Nav name={username}/>
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
