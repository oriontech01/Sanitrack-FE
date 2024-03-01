import React, { useContext, useEffect } from 'react';
import NavigationStack from './util/NavigationStack';
import TopLevelContext from './context/index';
import * as Notifications from 'expo-notifications';
import 'react-native-gesture-handler';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// Notifications.addNotificationReceivedListener((notification) => {
//   console.log(notification);
// });

// // Called when a user interacts with a notification (app can be foregrounded, backgrounded, or killed)
// Notifications.addNotificationResponseReceivedListener((response) => {
//   console.log(response);
// });
// import { NotificationContext } from './context/NotificationContext';

export default function App() {
  return (
    <TopLevelContext>
      <NavigationStack />
    </TopLevelContext>
  );
}
