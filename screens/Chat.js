import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import db from '../util/firebase'; // adjust the path
import { UserContext } from './../context/UserContext';

// Assuming userData is passed as a prop to the Chat component
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {user}  = useContext(UserContext)

  useEffect(() => {
    const unsubscribe = db.collection('messages').orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const firestoreMessages = snapshot.docs.map(doc => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: new Date(firebaseData.createdAt.seconds * 1000),
            user: firebaseData.user,
          };

          return data;
        });

        setMessages(firestoreMessages);
      });

    return () => unsubscribe(); // Unsubscribe from firestore updates
  }, []);

  const onSend = useCallback((messages = []) => {
    messages.forEach(message => {
      db.collection('messages').add({
        ...message, 
        createdAt: new Date(),
        user: {
          _id: user.id,
          name: user.username,
        }
      });
    });
  }, [user]);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.id,
        name: user.username,
      }}
    />
  );
};

export default Chat;