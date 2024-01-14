import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import colors from '../util/colors';

const styles = StyleSheet.create({
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
      },
      userText: {
        marginLeft: 10,
        color: colors.white,
        fontSize: 20,
      },
})
const Nav = ({name}) => {
  return (
    <View style={styles.userContainer}>
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Icon name="account-circle-outline" size={40} color={colors.black}  />
      <Text style={styles.userText}>HELLO {name}</Text>
    </View>
    <Icon name="bell-outline" size={22} color={colors.white} />
 </View>
  )
}

export default Nav