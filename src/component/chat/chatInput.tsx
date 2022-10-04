import React, { useState } from 'react';
import styles from './chatInput.module.css';
import moment from 'moment';
import Icon from '../icon/icon';

interface ChatInputProps {
  socket: any;
  userId: string;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = ({
  socket,
  userId,
}) => {
  const [chatMessage, setChatMessage] = useState('');

  const onChatMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    socket.emit('onSend', {
      userId: userId,
      msg: chatMessage,
      time: moment(new Date()).format('HH시 mm분'),
    });
    setChatMessage('');
  };
  return (
    <div className={styles.send}>
      <input
        value={chatMessage}
        className={styles.input}
        onChange={onChatMsgChange}
      />
      <button className={styles.sendBtn} onClick={onSubmit}>
        <p className={styles.sendIcon}>
          <Icon icon='PaperPlane' />
        </p>
      </button>
    </div>
  );
};

export default ChatInput;
