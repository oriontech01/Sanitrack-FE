import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import { RoomContext } from "./RoomContext";

export default TopLevelContext = ({ children }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState(""); // This will be used to determine what role a user will have when logged in
  const [roomID, setRoomID] = useState("");
  return (
    <RoomContext.Provider value={{ roomID, setRoomID }}>
      <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
        <AuthContext.Provider
          value={{ username, setUserName, password, setPassword }}
        >
          {children}
        </AuthContext.Provider>
      </UserContext.Provider>
    </RoomContext.Provider>
  );
};
