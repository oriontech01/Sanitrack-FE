import {React, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you have installed react-native-vector-icons
import colors from '../util/colors';
import Checkbox  from 'expo-checkbox';

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
        color: colors.black,
        fontSize: 24,
        textAlign: 'center', // Ensure text is centered within the wrapper
      },
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
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
      width: '80%',
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
      width: '60%',
      alignItems: 'center',
      marginTop: 20,
      alignSelf: 'center'
    },
    submitButtonText: {
      fontWeight: 'bold',
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
        gap: 10
     },
    checkBox: {
        height: 30,
        width: 30,
        backgroundColor: '#D9D9D9',
        borderRadius: 10
     },
    backArrow: {
        position: 'absolute', // Positioning over the parent view
        left: 0, // Align to the left
        top: 0, // Align to the top
      },
    headerTitleWrapper: {
        flex: 1, // Take available space to enforce centering of the title
        alignItems: 'center', // Center title text horizontally
      },
  });
const Room = ({route, navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                <Icon name="arrow-left" size={24} color={colors.black} />
            </TouchableOpacity>
            <View style={styles.headerTitleWrapper}>
                <Text style={styles.headerText}>{route.params.roomName}</Text>
            </View>
        </View>
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
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const Item = ({ label }) =>{
   const [isSelected, setSelection] = useState(false);
   return (
   <View style={styles.itemsContainer}>
    <View style={styles.item}>
        <Text style={styles.itemText}>{label}</Text>
        <TouchableOpacity>
          <Icon name="cloud-upload" size={24} color={colors.black} />
        </TouchableOpacity>
    </View>
    <TouchableOpacity>
    <Checkbox
        value={isSelected}
        onValueChange={setSelection}
        color={isSelected ? '#4630EB' : undefined}
        style={styles.checkBox}
      />
    </TouchableOpacity>
 </View>
 )
} 
export default Room;