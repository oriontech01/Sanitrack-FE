import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import colors from "../../util/colors";
import { NotificationContext } from "../../context/NotificationContext";

import NotificationList from "./components/NotificationList";

export default function NotificationHome() {
  const { notifications } = useContext(NotificationContext);
  useEffect(() => {
    console.log('Notifications updated:', notifications);
  }, [notifications]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.length > 0 ? (
        notifications.map((notification) => {
          return (
            <NotificationList
              body={notification.body}
              title={notification.title}
              key={notification.id}
              date={notification.date.toDate()}
            />
          );
        })
      ) : (
        <Text>No notification Available</Text>
      )}
      {/* <View style={styles.label}>
        <Text style={{ color: '#809997' }}>Yesterday</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    padding: 20,
  },
  header: {
    color: colors.blue,
    fontSize: 19,
    marginTop: 20,
    fontWeight: "bold",
  },
  label: {
    width: "100%",
    padding: 5,
    backgroundColor: "#F5F5F5",
    marginTop: 20,
  },
});
