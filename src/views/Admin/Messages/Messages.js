import React, { useState, useEffect, useRef } from 'react';

import UserList from './UserList';
import Chat from './Chat';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null); // Ref to keep track of the end of the messages

  // Scroll to bottom whenever the messages change
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  // useEffect(() => {
  //   const messagesRef = collection(db, 'messages');
  //   const q = query(messagesRef, orderBy('timestamp'));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const messages = snapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
  //       const formattedTimestamp = format(timestamp, 'p');
  //       return {
  //         id: doc.id,
  //         ...data,
  //         formattedTimestamp
  //       };
  //     });
  //     setMessages(messages);
  //     setLoading(false); // Set loading to false once messages are loaded
  //   });

  //   return () => unsubscribe();
  // }, []);

  // const sendMessage = async () => {
  //   if (newMessage.trim()) {
  //     await addDoc(collection(db, 'messages'), {
  //       text: newMessage,
  //       timestamp: serverTimestamp(),
  //       senderName: localStorage.getItem('name')
  //       // Add other fields like sender ID, etc.
  //     });
  //     setNewMessage('');
  //   }
  // };

  let usersArray = [
    {
      id: 1,
      userName: 'General ',
      role: 'group',
      chat: {
        id: 1,
        sentMessages: ['Hello there!', 'How are you doing?'],
        receivedMessages: ['Hi!', "I'm good, thanks."]
      }
    },
    {
      id: 2,
      userName: 'Richard Achonye',
      role: 'user',
      chat: {
        id: 2,
        sentMessages: ['Hey!', "What's up?"],
        receivedMessages: ['Not much.', 'Just chilling.']
      }
    },
    {
      id: 3,
      userName: 'Trent Arnold',
      role: 'user',
      chat: {
        id: 3,
        sentMessages: ['Hi everyone!', "How's your day?"],
        receivedMessages: ['Hello!', "It's going well, thanks."]
      }
    },
    {
      id: 4,
      userName: 'James Blake',
      role: 'user',
      chat: {
        id: 4,
        sentMessages: ['Good morning!', "What's on the agenda today?"],
        receivedMessages: ['Morning!', 'Just work as usual.']
      }
    }
    // Add more users as needed
  ];

  const [chat, setChat] = useState(usersArray[0]);
  return (
    <main className=" bg-[#fff] h-screen">
      <section className="flex justify-center gap-4 lg:grid-flow-row h-[550px]">
        <div className="lg:w-3/10 md:w-1/3 m-5 p-5 bg-white h-[550px] ">
          <UserList data={usersArray} setChat={setChat} />
        </div>
        <div className="lg:w-7/10 md:w-2/3 p-5 text-center bg-white m-5">
          <Chat chats={chat} />
        </div>
      </section>
    </main>
  );
};

export default Messages;
