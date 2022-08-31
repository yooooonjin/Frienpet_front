import React from 'react';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header_container}>
      <div className={styles.header}>
        <img className={styles.logo} src='frienpet.png' alt='logo' />
        <div className={styles.button_container}>
          <button className={`${styles.button} ${styles.login}`}>로그인</button>
          <button className={`${styles.button} ${styles.signUp}`}>
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
