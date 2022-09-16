import React, { useRef } from 'react';
import styles from './guest.module.css';

interface GuestProps {
  onPageChange(e: React.MouseEvent<HTMLElement>): void;
}

const Guest: React.FunctionComponent<GuestProps> = ({ onPageChange }) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const onDropDown = () => {
    listRef.current!.classList.toggle(`${styles.hide}`);
  };

  return (
    <div className={styles.button_container}>
      <button
        className={`${styles.button} ${styles.signUp}`}
        id='join'
        onClick={onPageChange}
      >
        회원가입
      </button>
      <button
        className={`${styles.button} ${styles.login}`}
        id='login'
        onClick={onPageChange}
      >
        로그인
      </button>
    </div>
  );
};

export default Guest;
