import React, { useRef } from 'react';
import styles from './member.module.css';

import { logout } from '../../../apis/user';
import storage from '../../../service/storage';
import { userLogout } from '../../../modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import Dropdown from '../../common/dropdown/dropdown';

interface MemberProps {
  onPageChange(e: React.MouseEvent<HTMLElement>): void;
}

const Member: React.FunctionComponent<MemberProps> = ({ onPageChange }) => {
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.loggedInfo.name);

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
      <Dropdown
        firstText='개인정보 수정'
        firstId='user'
        onFirstClick={(e) => {
          onPageChange(e);
        }}
        secondText='로그아웃'
        secondId='logout'
        onSecondClick={(e) => {
          onLogout();
        }}
      />
    </div>
  );
};

export default Member;
