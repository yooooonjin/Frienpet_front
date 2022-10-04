import React, { useState } from 'react';
import styles from './JoinPage.module.css';
import JoinUserInfo from '../../component/join/user_info/join_user_info';
import JoinAnimalInfo from '../../component/join/animal_info/join_animal_info';
import { useNavigate } from 'react-router-dom';
import { join } from '../../apis/user';
import { savePetInfo } from '../../apis/pet';
import Nav from '../../component/join/nav/nav';
import Icon from '../../component/icon/icon';

export type User = {
  [key: string]: string | undefined;
  email: string;
  name: string;
  pw?: string;
  phone: string;
  sido: string;
  sigungu: string;
  bname: string;
};
export type Animal = {
  petid: string;
  name: string;
  upkind: string;
  kind: string;
  gender: string;
  size: string;
  color: string;
  feature: string;
};

export const initAnimal = {
  petid: '',
  name: '',
  upkind: '',
  kind: '',
  gender: '',
  size: '',
  color: '',
  feature: '',
};
const JoinPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('userInfo');
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    pw: '',
    phone: '',
    sido: '',
    sigungu: '',
    bname: '',
  });

  const onSubmit = (animal: Animal) => {
    try {
      join(user);
      savePetInfo({ ...animal, userid: user.email });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={styles.join_container}>
      <h2 className={styles.title}>회원가입</h2>
      <p className={styles.sub_title}>
        회원 가입 하신 후 다양한 서비스를 만나보세요.
      </p>
      <Nav currentPage={currentPage} />
      {/* 가입자 정보 입력 페이지 (입력 정보를 기억하기 위해 hide 처리) */}
      <div
        className={`${styles.info_wrap} ${
          currentPage !== 'userInfo' && styles.hide
        }`}
      >
        <JoinUserInfo
          setCurrentPage={setCurrentPage}
          user={user}
          setUser={setUser}
        />
      </div>
      {/* 동물 정보 입력 페이지 (입력 정보를 기억하기 위해 hide 처리) */}
      <div
        className={`${styles.info_wrap} ${
          currentPage !== 'animalInfo' && styles.hide
        }`}
      >
        <JoinAnimalInfo setCurrentPage={setCurrentPage} join={onSubmit} />
      </div>
      {/* 가입 완료 페이지 (입력 정보를 기억하기 위해 hide 처리) */}
      <div
        className={`${styles.info_wrap} ${
          currentPage !== 'completion' && styles.hide
        }`}
      >
        <div className={styles.completion_container}>
          <p className={styles.checkIcon}>
            <Icon icon='ircleCheck' />
          </p>
          <div className={styles.completion_title}>회원가입 완료</div>
          <p className={styles.completion_sub_title}>
            프렌펫 가입이 완료되었습니다.
            <br />
            로그인 후 홈페이지를 자유롭게 이용해주세요 :)
          </p>
          <button
            className={`${styles.button} ${styles.submit}`}
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinPage;
