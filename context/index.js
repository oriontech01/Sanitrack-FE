import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { UserContext } from './UserContext';
import { RoomContext } from './RoomContext';
import UserState from './states/userState';

export default TopLevelContext = ({ children }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // This will be used to determine what role a user will have when logged in
  const [roomID, setRoomID] = useState('');
  return (
    <RoomContext.Provider value={{ roomID, setRoomID }}>
      <UserState>
        <AuthContext.Provider
          value={{ username, setUserName, password, setPassword }}>
          {children}
        </AuthContext.Provider>
      </UserState>
    </RoomContext.Provider>
  );
};
