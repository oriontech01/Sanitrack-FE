import React, {useState} from "react";
import {AuthContext} from './AuthContext';
import { UserContext } from "./UserContext";
import { RoomContext } from "./RoomContext";

export default TopLevelContext = ({children}) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState({})
    const [roomID, setRoomID] = useState("")
    return (
        <RoomContext.Provider value={{roomID, setRoomID}}>
        <UserContext.Provider value={{user, setUser}}>
            <AuthContext.Provider value={{username,setUserName,password,setPassword}}>
               {children}
            </AuthContext.Provider>
        </UserContext.Provider>
      </RoomContext.Provider>
    )
}

