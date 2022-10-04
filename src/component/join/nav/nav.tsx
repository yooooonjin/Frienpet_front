import React from 'react';
import CurrentPage from './currentPage';
import styles from './nav.module.css';

interface NavProps {
  currentPage: string;
}

const Nav: React.FunctionComponent<NavProps> = ({ currentPage }) => {
  return (
    <div className={styles.nav_container}>
      <CurrentPage current={true} title='사용자 정보 입력' />
      <div className={styles.line}></div>
      <CurrentPage
        current={currentPage !== 'userInfo' ? true : false}
        title='반려 동물 정보 입력'
      />
      <div className={styles.line}></div>
      <CurrentPage
        current={currentPage === 'completion' ? true : false}
        title='가입 완료'
      />
    </div>
  );
};

export default Nav;
