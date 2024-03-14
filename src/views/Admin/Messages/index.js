import { Box } from '@mui/material';
import React from 'react';
// import {ChatEngine} from 'react-chat-engine'
// import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced';
const secret = localStorage.getItem('secret');
const username = localStorage.getItem('name');
const projectID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
import { PrettyChatWindow } from 'react-chat-engine-pretty';

console.log({ secret, username, projectID });
const ChatHome = () => {
  // const chatProps = useMultiChatLogic(projectID, username, secret);
  return (
    // <ChatEngine projectID={projectID} userName={username} userSecret={secret}/>
    // <Box height={'100vh'}>
    //   <MultiChatSocket {...chatProps} />
    //   <MultiChatWindow {...chatProps} style={{ height: '100%' }} />
    // </Box>
    <Box height={'100vh'}>
        <PrettyChatWindow projectId={projectID} username={username} secret={secret} style={{ height: '100vh' }} />
    </Box>
  );
};

export default ChatHome;
