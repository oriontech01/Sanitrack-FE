import axios from 'axios';
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync(authToken) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  // Here, you could send the token to your server for database storage, etc.
  const res = await axios.post('http://192.168.0.161:5000/api/notification/get-token', {token}, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  console.log(res.data)
}

export default registerForPushNotificationsAsync