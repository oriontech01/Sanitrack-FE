import React, { useContext, useEffect } from 'react';
import TopLevelContext from './context/index';
import * as Notifications from 'expo-notifications';
import { NotificationContext } from './context/NotificationContext';
import { UserContext } from './context/UserContext';
import RootNavigator from './util/RootNavigator';

export default function App() {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const user = useContext(UserContext)

  useEffect(() => {
    // Set the notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Subscribe to notification received events
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    // Subscribe to notification response events (user interaction)
    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    // Cleanup subscriptions on component unmount
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, [setNotifications]);

  // Effect to log notifications state updates
  useEffect(() => {
    console.log('Updated notifications', notifications);
  }, [notifications]);

  return (
    <TopLevelContext>
        <RootNavigator/>
    </TopLevelContext>
  );
}
