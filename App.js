import NavigationStack from './util/NavigationStack';
import {AuthContext} from './context/AuthContext';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { RoomContext } from './context/RoomContext';

export default function App() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({})
  const [roomID, setRoomID] = useState("")
  return (
    <RoomContext.Provider value={{roomID, setRoomID}}>
      <UserContext.Provider value={{user, setUser}}>
          <AuthContext.Provider value={{username,setUserName,password,setPassword}}>
            <NavigationStack/>
          </AuthContext.Provider>
      </UserContext.Provider>
    </RoomContext.Provider>
  );
}


