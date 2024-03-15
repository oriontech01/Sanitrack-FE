// import React, { useState, useCallback, useContext, useEffect } from "react";
// import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import db from "../util/firebase";
// import { UserContext } from "./../context/UserContext";
// import {
//   collection,
//   addDoc,
//   query,
//   orderBy,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import Nav from "../components/Nav";
// import {View, StyleSheet, ActivityIndicator} from "react-native"

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const { user } = useContext(UserContext); // Assuming you have a UserContext
//   const [isLoading, setIsLoading] = useState(true); // Add this line

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.primary,
//     },
//     sendButton: {
//       marginBottom: 10,
//       marginRight: 10,
//     },
//   });

//   // Customize message bubble
//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: colors.darkblue, // Adjust this color to match your theme
//           },
//           left: {
//             backgroundColor: colors.secondary,
//           },
//         }}
//         textStyle={{
//           right: {
//             color: colors.white,
//           },
//           left: {
//             color: colors.black,
//           },
//         }}
//       />
//     );
//   };

//   // Customize the send button
//   const renderSend = (props) => {
//     return (
//       <Send {...props}>
//         <View style={styles.sendButton}>
//           <Icon name="send-circle" size={32} color={colors.darkblue} />
//         </View>
//       </Send>
//     );
//   };

//   useEffect(() => {
//     const messagesRef = collection(db, "messages");
//     const q = query(messagesRef, orderBy("timestamp", "asc"));
  
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const loadedMessages = snapshot.docs.map((doc) => {
//         const firebaseData = doc.data();
//         const createdAt = firebaseData.timestamp
//           ? firebaseData.timestamp.toDate()
//           : new Date();
//         return {
//           _id: doc.id,
//           text: firebaseData.text,
//           createdAt,
//           user: {
//             _id: firebaseData.senderId || "unknown",
//             name: firebaseData.senderName || "Unnamed",
//           },
//         };
//       });
//       setMessages(loadedMessages.reverse());
//       setIsLoading(false); // Set loading to false after messages are loaded
//     });
  
//     return () => unsubscribe();
//   }, []);
  
//   const onSend = useCallback(
//     (messages = []) => {
//       messages.forEach(async (message) => {
//         const { text } = message;
//         if (!user.username) {
//           console.error("User name is undefined");
//           return;
//         }
//         await addDoc(collection(db, "messages"), {
//           text,
//           timestamp: serverTimestamp(), // Firestore handles conversion
//           senderName: user.username,
//         });
//       });
//     },
//     [user.username]
//   ); // Ensure this uses the correct user property


//   return (
//     <View style={styles.container}>
//       <Nav name={user.username} />
//       {isLoading ? (
//         <ActivityIndicator size="large" color={colors.white} /> // Customize the size and color as needed
//       ) : (
//         <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: user.id,
//           name: user.name,
//         }}
//         renderBubble={renderBubble}
//         renderSend={renderSend}
//         alwaysShowSend
//         scrollToBottom
//         scrollToBottomComponent={() => (
//           <Icon name="chevron-double-down" size={22} color={colors.darkblue} />
//         )}
//       />
//       )}
//     </View>
//   );
// };

// export default Chat;

import { View, Text } from 'react-native'
import React from 'react'



export default function Chat() {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  )
}