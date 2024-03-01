import axios from "axios";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert } from "react-native";

async function registerForPushNotificationsAsync(authToken) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  try {
    // Here, you could send the token to your server for database storage, etc.
    const res = await axios.post(
      `${Constants.expoConfig.extra.baseUrl}notification/get-token`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("Response", res.data)
  } catch (error) {
    Alert.alert("Error", error.message);
  }
}

export default registerForPushNotificationsAsync;
