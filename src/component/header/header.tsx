import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
  const navigate = useNavigate();

  const [selectedPage, setSelectedPage] = useState<string>();

  const onPageChange = (
    e: React.MouseEvent<HTMLLIElement | HTMLImageElement>
  ) => {
    const target = e.target as HTMLLIElement;
    setSelectedPage(target.id);
    navigate(`/${target.id}`);
  };
  return (
    <header className={styles.header_container}>
      <div className={styles.header}>
        <img
          id=''
          onClick={onPageChange}
          className={styles.logo}
          src='frienpet.png'
          alt='logo'
        />
        <ul className={styles.nav}>
          <li
            className={`${selectedPage === 'discovery' && styles.selected}`}
            id='discovery'
            onClick={onPageChange}
          >
            우리동네 반려동물 발견
          </li>
          <li
            className={`${selectedPage === 'findPet' && styles.selected}`}
            id='findPet'
            onClick={onPageChange}
          >
            함께 우리동네 반려동물 찾기
          </li>
          <li
            className={`${selectedPage === 'homeless' && styles.selected}`}
            id='homeless'
            onClick={onPageChange}
          >
            보호중인 유기동물
          </li>
        </ul>
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
