import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Guest from './guest/guest';
import styles from './header.module.css';
import Member from './member/member';

interface HeaderProps {
  accessToken: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ accessToken }) => {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState<string>();

  const onPageChange = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    setSelectedPage(id);
    navigate(`/${id}`);
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
        {accessToken ? (
          <Member onPageChange={onPageChange} />
        ) : (
          <Guest onPageChange={onPageChange} />
        )}
      </div>
    </header>
  );
};

export default Header;
