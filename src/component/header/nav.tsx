import React, { Dispatch, SetStateAction } from 'react';
import Icon from '../icon/icon';
import styles from './nav.module.css';

interface NavProps {
  onClick(e: React.MouseEvent<HTMLElement>): void;
  selectedPage?: string;
  pageId: string;
  msg: string;
}

const Nav: React.FunctionComponent<NavProps> = ({
  onClick,
  selectedPage,
  pageId,
  msg,
}) => {
  return (
    <li
      className={`${selectedPage === pageId && styles.selected}`}
      id={pageId}
      onClick={onClick}
    >
      <p className={styles.text}>{msg}</p>
      <p className={styles.icon}>
        <Icon icon={pageId} />
      </p>
    </li>
  );
};

export default Nav;
