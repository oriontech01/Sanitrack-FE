// custom-service-worker.js
self.addEventListener('push', event => {
    const data = event.data.json();
    console.log("Notification Data", data)
    const { title, body } = data;
    event.waitUntil(self.registration.showNotification(title, { body }));
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  