import React, {useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import colors from '../util/colors';
import { UserContext } from '../context/UserContext';
import { RoomContext } from '../context/RoomContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 15,
        alignItems: 'center',
        gap: 5,
        // backgroundColor: colors.bgColor,
        // borderRadius: 10
      },
      userText: {
        marginLeft: 10,
        color: colors.white,
        fontSize: 20,
      },
})

const Nav = ({name}) => {
  const {setUserName, setPassword} = useContext(AuthContext) 
  const {setUser, setUserRole} = useContext(UserContext) 
  const {setRoomID} = useContext(RoomContext)
  const navigation = useNavigation() 

  const logout = () => {
     Alert.alert("Auth", 'You have been logged out!')
     setUser({})
     setPassword('')
     setUserName('')
     setRoomID('')
     setUserRole('')
     navigation.navigate("Login")
  }
  return (
    <View style={styles.userContainer}>
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Icon name="account-circle-outline" size={40} color={colors.black}  />
      <Text style={styles.userText}>HELLO {name}</Text>
    </View>
    <View style={{flexDirection: 'row', gap: 20, alignItems:'center'}}>
        <Icon name="bell-outline" size={22} color={colors.white} />
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
           <Icon name='message' color={colors.white} size={22} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="logout-variant" size={26} color={colors.white} onPress={()=> logout()}/>
        </TouchableOpacity>
     </View>
 </View>
  )
}
export default Nav