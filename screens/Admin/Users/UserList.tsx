import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../util/colors";
import { useNavigation } from "@react-navigation/native";

const UserList = ({ userData }) => {
  const navigation = useNavigation()
  const headerText =
    userData[0]?.role_name === "Cleaner" ? "Cleaners" : "Inspectors";
  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color={colors.lightgray}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{headerText}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddUsers") }>
          <Ionicons name="add" size={30} color={colors.lightgray} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={userData}
        renderItem={renderUser}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 2,
    paddingRight: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    padding: 16,
    color: colors.blue
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  // profileImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   marginRight: 16,
  // },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.blue,
  },
  userEmail: {
    fontSize: 16,
    color: "grey",
  },
  chevron: {
    fontSize: 18,
    color: "grey",
  },
});

export default UserList;
