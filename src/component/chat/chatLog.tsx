import React, { useEffect, useRef, useState } from 'react';
import styles from './chatLog.module.css';

interface ChatLogProps {
  socket: any;
  userId: string;
}

type Message = {
  userId?: string;
  msg: string;
  time?: string;
};

const ChatLog: React.FunctionComponent<ChatLogProps> = ({ socket, userId }) => {
  const [msgList, setMsgList] = useState<Array<Message>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('onReceive', (messageItem: any) => {
      setMsgList((msgList) => [...msgList, messageItem]);
    });
    socket.on('onConnect', (systemMessage: any) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    socket.on('onDisconnect', (systemMessage: any) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (scrollRef) {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [msgList]);

  return (
    <div className={styles.chatting}>
      <div ref={scrollRef}>
        {msgList.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.chat} ${
              msg.userId === userId && styles.sendMsg
            }`}
          >
            {msg.userId && <div className={styles.userId}>{msg.userId}</div>}
            <div className={`${styles.msg} ${!msg.userId && styles.alert}`}>
              {msg.msg}
            </div>
            <div className={styles.time}>{msg.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLog;
