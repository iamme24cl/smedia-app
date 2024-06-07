// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io("http://localhost:5000", {
//     extraHeaders: {
//         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//     }
// });

// const Messages = () => {
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         socket.on('new_message', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         return () => {
//             socket.disconnect();
//         }
//     }, []);

//   return (
//     <div>
//         <h2>Messages</h2>
//         <ul>
//             {messages.map((message) => (
//                 <li key={message.id}>{message.content}</li>
//             ))}
//         </ul>
//     </div>
//   );
// };

// export default Messages;