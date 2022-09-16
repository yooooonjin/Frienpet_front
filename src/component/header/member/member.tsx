import React, { useRef } from 'react';
import styles from './member.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faCircleUser,
  faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../../apis/user';
import storage from '../../../service/storage';
import { userLogout } from '../../../modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';

interface MemberProps {
  onPageChange(e: React.MouseEvent<HTMLElement>): void;
}

const Member: React.FunctionComponent<MemberProps> = ({ onPageChange }) => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.loggedInfo.name);

  const listRef = useRef<HTMLDivElement>(null);
  const onDropDown = () => {
    listRef.current!.classList.toggle(`${styles.hide}`);
  };

  const onLogout = async () => {
    await logout();
    storage.remove('loggedInfo');
    dispatch(userLogout());
    window.location.replace('/');
  };
  return (
    <div className={styles.user}>
      <span className={styles.userName}></span>
      {name}
      <div className={styles.userInfo}>
        <div onClick={onDropDown}>
          <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
        </div>
        <div ref={listRef} className={`${styles.userList} ${styles.hide}`}>
          <div
            id='user'
            onClick={(e) => {
              onDropDown();
              onPageChange(e);
            }}
          >
            개인정보 수정
            <FontAwesomeIcon icon={faUserPen} />
          </div>
          <div onClick={onLogout}>
            로그아웃
            <FontAwesomeIcon icon={faRightFromBracket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
