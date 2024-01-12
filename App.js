import { StyleSheet, Text, View, Button } from 'react-native';
import NavigationStack from './util/NavigationStack';
import {AuthContext} from './context/AuthContext';
import { useState } from 'react';

export default function App() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  return (
      <AuthContext.Provider value={{username,setUserName,password,setPassword}}>
         <NavigationStack/>
      </AuthContext.Provider>
  );
}


