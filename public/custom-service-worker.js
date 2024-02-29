// custom-service-worker.js
self.addEventListener('push', event => {
    const data = event.data.json();
    const { title, body } = data;
    console.log("Notification Data", data)
    event.waitUntil(self.registration.showNotification(title, { body }));
  });
  
  self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
  });
  