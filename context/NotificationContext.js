import { createContext, useState } from "react";

// Create context
export const NotificationContext = createContext({
  notifications: [],
  setNotifications: (notification) => {},
});

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
