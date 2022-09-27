import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatInput from './chatInput';
import ChatLog from './chatLog';

const Chat = ({ roomId, userId }: { roomId: string; userId: string }) => {
  const [currentSocket, setCurrentSocket] = useState<any>();

  const myInfo = {
    roomId: roomId,
    userId: userId,
  };

  useEffect(() => {
    setCurrentSocket(
      socketIOClient('http://localhost:5000', { withCredentials: true })
    );
  }, []);

  useEffect(() => {
    if (currentSocket) {
      currentSocket.on('connect', () => {
        currentSocket.emit('join', myInfo);
      });
    }
  }, [currentSocket]);

  return (
    <div>
      {currentSocket && (
        <>
          <ChatLog userId={userId} socket={currentSocket}></ChatLog>
          <ChatInput userId={userId} socket={currentSocket}></ChatInput>
        </>
      )}
    </div>
  );
};

export default Chat;
