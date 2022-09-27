import React, { useRef, useState } from 'react';
import styles from './chatInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface ChatInputProps {
  socket: any;
  userId: string;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = ({
  socket,
  userId,
}) => {
  const [chatMessage, setChatMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

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
    formRef.current?.reset();
  };
  return (
    <form ref={formRef} className={styles.send}>
      <input className={styles.input} onChange={onChatMsgChange} />
      <button className={styles.sendBtn} onClick={onSubmit}>
        <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} />
      </button>
    </form>
  );
};

export default ChatInput;
