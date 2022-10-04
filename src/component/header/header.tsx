import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Guest from './guest/guest';
import styles from './header.module.css';
import Member from './member/member';
import Icon from '../icon/icon';
import Nav from './nav';

const Header = ({ accessToken }: { accessToken: string }) => {
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
          onClick={onPageChange}
          className={styles.logo}
          src='frienpet.png'
        />
        <ul className={styles.nav}>
          <Nav
            selectedPage={selectedPage}
            pageId='discovery'
            msg='우리동네 반려동물 발견'
            onClick={onPageChange}
          />
          <Nav
            selectedPage={selectedPage}
            pageId='lostPet'
            msg='함께 우리동네 반려동물 찾기'
            onClick={onPageChange}
          />
          <Nav
            selectedPage={selectedPage}
            pageId='homeless'
            msg='보호중인 유기동물'
            onClick={onPageChange}
          />
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
