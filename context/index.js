import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { RoomContext } from "./RoomContext";
import UserState from "./states/userState";
import { NotificationProvider } from "./NotificationContext";

export default TopLevelContext = ({ children }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // This will be used to determine what role a user will have when logged in
  const [roomID, setRoomID] = useState("");

  return (
    <RoomContext.Provider value={{ roomID, setRoomID }}>
      <UserState>
        <AuthContext.Provider
          value={{ username, setUserName, password, setPassword }}
        >
          <NotificationProvider>{children}</NotificationProvider>
        </AuthContext.Provider>
      </UserState>
    </RoomContext.Provider>
  );
};
