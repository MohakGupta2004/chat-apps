import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import React from 'react'
import { useParams } from 'react-router-dom';
function Chat() {
  const {id} = useParams()
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{roomId: string, message:string}>>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socketInstance = io('http://localhost:5000'); // Ensure this matches your backend
    setSocket(socketInstance);
    socketInstance.emit("joinRoom",id);
    // Listen for connection event
    socketInstance.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for incoming messages
    socketInstance.on('message', (message) => {
      setMessages((prev) => [...prev, {roomId: id!, message: message}]);
   });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [id]); // Runs only once on mount

  return (
    <>
      <input
        type="text"
        value={input}
        placeholder="Type a message"
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (socket) {
            socket.emit("message", {roomId: id, message: input})
            setInput(''); // Clear input after sending
          } else {
            console.log('Socket is not connected');
          }
        }}
      >
        Send
      </button>
      <div>
        {messages.map((m, k) => (
          <p key={k}>{m.message}</p>
        ))}
     </div>
    </>
  );
}

export default Chat;
