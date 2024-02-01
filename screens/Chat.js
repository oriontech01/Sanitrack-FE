import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../util/firebase";
import { UserContext } from "./../context/UserContext";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {format} from 'date-fns'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext); // Assuming you have a UserContext

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => {
        const firebaseData = doc.data();
        // Convert Firestore timestamp to JavaScript Date object for GiftedChat
        const createdAt = firebaseData.timestamp ? firebaseData.timestamp.toDate() : new Date();
        return {
          _id: doc.id,
          text: firebaseData.text,
          createdAt, // Use the converted Date object
          user: {
            _id: firebaseData.senderId || 'unknown',
            name: firebaseData.senderName || 'Unnamed',
          },
        };
      });
      setMessages(loadedMessages.reverse());
    });
  
    return () => unsubscribe();
  }, []);
  

const onSend = useCallback((messages = []) => {
  messages.forEach(async (message) => {
    const { text } = message;
    if (!user.username) {
      console.error("User name is undefined");
      return;
    }
    await addDoc(collection(db, 'messages'), {
      text,
      timestamp: serverTimestamp(), // Firestore handles conversion
      senderName: user.username,
    });
  });
}, [user.username]); // Ensure this uses the correct user property

  
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id, // Assuming the user's ID is stored in user context
        name: user.name, // Assuming the user's name is stored in user context
      }}
    />
  );
};

export default Chat;