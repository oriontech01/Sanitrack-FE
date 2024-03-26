import axios from "axios"
const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
import urlBase64ToUint8Array from "./urlBase64ToUintArray"

const sendSubscription = async (subscription, authToken) => {
  const res = await axios.post(`${process.env.REACT_APP_BASE_URL}notification/subscribe-to-push-notifications`, subscription ,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
  })

  console.log("SUB SENT", res.data)
}

// export function subscribeUser(authToken) {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(function(registration) {
//       if (!registration.pushManager) {
//         console.log('Push manager unavailable.')
//         return
//       }

//       registration.pushManager.getSubscription().then(function(existedSubscription) {
//         if (existedSubscription === null) {
//           console.log('No subscription detected, make a request.')
//           registration.pushManager.subscribe({
//             applicationServerKey: convertedVapidKey,
//             userVisibleOnly: true,
//           }).then(function(newSubscription) {
//             console.log('New subscription added.', newSubscription)
//             console.log("AUTH", authToken)
//             sendSubscription(newSubscription, authToken)
//           }).catch(function(e) {
//             if (Notification.permission !== 'granted') {
//               console.log('Permission was not granted.')
//             } else {
//               console.error('An error ocurred during the subscription process.', e)
//             }
//           })
//         } else {
//           console.log('Existed subscription detected.')
//           sendSubscription(existedSubscription, authToken)
//         }
//       })
//     })
//       .catch(function(e) {
//         console.error('An error ocurred during Service Worker registration.', e)
//       })
//   }
// }

export function subscribeUser(authToken) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(function(registration) {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.');
          return;
        }
          console.log("================================ SUBSCRIBE USER =================================")
        registration.pushManager.getSubscription().then(function(existedSubscription) {
          if (existedSubscription === null && Notification.permission === 'default') {
            console.log('Requesting notification permission...');
            Notification.requestPermission().then(function(permission) {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
                // Now that we have permission, subscribe the user
                registration.pushManager.subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                }).then(function(newSubscription) {
                  console.log('New subscription added.', newSubscription);
                  sendSubscription(newSubscription, authToken);
                }).catch(function(e) {
                  console.error('Failed to subscribe the user.', e);
                });
              } else {
                console.log('Notification permission denied.');
              }
            });
          } else if (existedSubscription !== null) {
            console.log('Existing subscription detected.');
            sendSubscription(existedSubscription, authToken);
          }
        });
      }).catch(function(e) {
        console.error('An error occurred during Service Worker registration.', e);
      });
    }
  }
  