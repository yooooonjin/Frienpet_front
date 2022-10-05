import React from 'react';
import Dropdown from '../../common/dropdown/dropdown';
import styles from './guest.module.css';

interface GuestProps {
  onPageChange(e: React.MouseEvent<HTMLElement>): void;
}

const Guest: React.FunctionComponent<GuestProps> = ({ onPageChange }) => {
  return (
    <>
      <div className={styles.button_container}>
        <button id='join' onClick={onPageChange}>
          회원가입
        </button>
        <button className={styles.login} id='login' onClick={onPageChange}>
          로그인
        </button>
      </div>
      <div className={styles.guest}>
        <Dropdown
          firstText='회원가입'
          firstId='join'
          onFirstClick={(e) => {
            onPageChange(e);
          }}
          secondText='로그인'
          secondId='login'
          onSecondClick={(e) => {
            onPageChange(e);
          }}
        />
      </div>
    </>
  );
};

export default Guest;
