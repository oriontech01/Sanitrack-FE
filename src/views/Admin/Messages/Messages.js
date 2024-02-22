import React, { useState, useEffect, useRef } from 'react';
import { db } from 'services/firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { Box, Container, Grid, InputAdornment, Paper, TextField, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Loader from 'component/Loader/Loader';
import './Messages.scss';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null); // Ref to keep track of the end of the messages

  // Scroll to bottom whenever the messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
        const formattedTimestamp = format(timestamp, 'p');
        return {
          id: doc.id,
          ...data,
          formattedTimestamp
        };
      });
      setMessages(messages);
      setLoading(false); // Set loading to false once messages are loaded
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        timestamp: serverTimestamp(),
        senderName: localStorage.getItem('name')
        // Add other fields like sender ID, etc.
      });
      setNewMessage('');
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <Container className="chat-container">
      <Box component={Paper} className="messages-list">
        {messages.map((message) => {
          const isSentByCurrentUser = message.senderName === localStorage.getItem('name');
          return (
            <Grid key={message.id} container className={`message-item ${isSentByCurrentUser ? 'sent' : 'received'}`}>
              <Grid item xs={12}>
                <Typography variant="body1" className="message-sender">
                  {message.senderName}
                </Typography>
                <Typography variant="body2" className="message-text">
                  {message.text}
                </Typography>
                <Typography variant="caption" className="timestamp">
                  {message.formattedTimestamp}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
      <Box className="message-input">
        <TextField
          className="input-field"
          variant="outlined"
          placeholder="Type something..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button className="send-message-button" variant="contained" color="primary" onClick={sendMessage} endIcon={<SendIcon />}>
                  Send
                </Button>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Container>
  );
};

export default Messages;
