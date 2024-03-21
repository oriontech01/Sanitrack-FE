import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../../util/colors';
import { Ionicons } from '@expo/vector-icons';


const RoomOverview = ({route, navigation}) => {
  const {roomData} = route.params;
  console.log("HEY HELLO", roomData)
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='chevron-back' color={colors.blue} size={24} />  
            </TouchableOpacity>
            <Text style={styles.roomName}>{roomData.assigned_room.roomName}</Text>
        </View>
      {roomData.tasks.map(task => (
        <View key={task._id} style={styles.taskContainer}>
          <Image source={{ uri: task.image ? task.image: 'https://placehold.co/400' }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.taskName}>{task.name}</Text>
            <Text style={styles.taskDetail}>{`Last cleaned: ${new Date(task.last_cleaned).toLocaleDateString()}`}</Text>
            <Text style={styles.taskStatus}>{task.isDone ? 'Completed' : 'Pending'}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.blue,
    paddingLeft: 20
  },
  taskContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 30
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDetail: {
    fontSize: 16,
  },
  taskStatus: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
    color: 'green',
  },
});

export default RoomOverview;
