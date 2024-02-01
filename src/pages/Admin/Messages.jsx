import '../../styles/Messages.scss';
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../services/firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { format } from 'date-fns';



const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref to keep track of the end of the messages

  // Scroll to bottom whenever the messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Convert Firestore timestamp to JavaScript Date object
          const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
          // Format the timestamp to a human-readable string
          const formattedTimestamp = format(timestamp, 'p'); // e.g., '12:00 PM, September 17 2020'
          return {
            id: doc.id,
            ...data,
            formattedTimestamp,
          };
        });
        setMessages(messages);
      });
    
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        timestamp: serverTimestamp(),
        senderName: localStorage.getItem("name"),
        // Add other fields like sender ID, etc.
      });
      console.log("Messages", messages)
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((message) => (
          <div key={message.id} className={`message-item ${message.sender === 'manager' ? 'sent' : 'received'}`}>
            <strong><p>{message.senderName}</p></strong> 
            <p>{message.text}</p>
            {/* {message.type === 'image' && <img src={message.imageUrl} alt="sent" />}
            {message.type === 'doc' && <div className="doc-message">Data base doc</div>} */}
            <span className="timestamp">{message.formattedTimestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type something..."
        />
        <input className='sendMessage' type='submit' onClick={sendMessage} value={"Send Message"}/>
      </div>
    </div>
  );
};

export default Messages;
