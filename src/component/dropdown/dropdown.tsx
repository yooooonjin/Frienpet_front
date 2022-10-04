import React, { useRef } from 'react';
import styles from './dropdown.module.css';
import Icon from '../icon/icon';

interface DropdownProps {
  onFirstClick(e: React.MouseEvent<HTMLElement>): void;
  firstText: string;
  firstId?: string;
  onSecondClick(e: React.MouseEvent<HTMLElement>): void;
  secondText: string;
  secondId?: string;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  onFirstClick,
  firstText,
  firstId,
  onSecondClick,
  secondText,
  secondId,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const onDropDown = () => {
    listRef.current!.classList.toggle(`${styles.hide}`);
  };
  return (
    <div className={styles.userInfo}>
      <div onClick={onDropDown}>
        <p className={styles.userIcon}>
          <Icon icon='User' />
        </p>
      </div>
      <div ref={listRef} className={`${styles.userList} ${styles.hide}`}>
        <div
          id={firstId}
          onClick={(e) => {
            onFirstClick(e);
            onDropDown();
          }}
        >
          {firstText}
          {firstId === 'user' && <Icon icon='UserPen' />}
        </div>
        <div
          id={secondId}
          onClick={(e) => {
            onDropDown();
            onSecondClick(e);
          }}
        >
          {secondText}
          {secondId === 'logout' && <Icon icon='RightFromBracket' />}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
