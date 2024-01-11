import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '../util/colors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkpurple,
        justifyContent: 'center',
        alignContent: 'center',
        gap: 120,
        padding: 20
    },
    workOrderButtons: {
        backgroundColor: colors.palepurple,
        width: '100%',
        height: 150,
        padding: 25,
        borderRadius: 50,
        alignItems: 'center', // Changed from alignContent for correct alignment
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        flexWrap: 'wrap', 
        fontSize: 20,
        lineHeight: 30,
      }
})
const WorkOrderSelection = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.workOrderButtons} onPress={() => navigation.navigate('BarCode')}>
            <Text style={styles.buttonText}>SCAN BARCODE TO VIEW WORK ORDER</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.workOrderButtons} onPress={() => navigation.navigate('WorkOrderLocations')}>
            <Text style={styles.buttonText}>SELECT FROM LIST</Text>
        </TouchableOpacity>
    </View>
  )
}

export default WorkOrderSelection