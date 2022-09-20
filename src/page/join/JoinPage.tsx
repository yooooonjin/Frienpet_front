import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './JoinPage.module.css';
import JoinUserInfo from '../../component/join/user_info/join_user_info';
import JoinAnimalInfo from '../../component/join/animal_info/join_animal_info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { join } from '../../apis/user';
import { savePetInfo } from '../../apis/pet';

export interface JoinUserInfoProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
export interface JoinAnimalInfoProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  join(): void;
  animal: Animal;
  setAnimal: Dispatch<SetStateAction<Animal>>;
}
export type User = {
  [key: string]: string | undefined;
  email: string;
  name: string;
  pw?: string;
  phone: string;
  upr_cd: string;
  org_cd: string;
};
export type Animal = {
  petid: string;
  name: string;
  upkind: string;
  kind: string;
  gender: string;
  weight: string;
  color: string;
  character: string;
};

const JoinPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('userInfo');
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    pw: '',
    phone: '',
    upr_cd: '',
    org_cd: '',
  });

  const [animal, setAnimal] = useState<Animal>({
    petid: '',
    name: '',
    upkind: '',
    kind: '',
    gender: '',
    weight: '',
    color: '',
    character: '',
  });

  const onSubmit = () => {
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
      <div className={styles.nav_container}>
        <div className={styles.nav}>
          <div className={`${styles.circle} ${styles.current}`}></div>
          <p className={`${styles.nav_title} ${styles.current_title}`}>
            사용자 정보 입력
          </p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.nav}>
          <div
            className={`${styles.circle} ${
              currentPage !== 'userInfo' && styles.current
            }`}
          ></div>
          <p
            className={`${styles.nav_title} ${
              currentPage !== 'userInfo' && styles.current_title
            }`}
          >
            반려 동물 정보 입력
          </p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.nav}>
          <div
            className={`${styles.circle} ${
              currentPage === 'completion' && styles.current
            }`}
          ></div>
          <p
            className={`${styles.nav_title} ${
              currentPage === 'completion' && styles.current_title
            }`}
          >
            가입 완료
          </p>
        </div>
      </div>
      <div
        className={`${currentPage !== 'userInfo' && styles.hide}
        ${styles.info_wrap}`}
      >
        <JoinUserInfo
          setCurrentPage={setCurrentPage}
          user={user}
          setUser={setUser}
        />
      </div>
      <div
        className={`${currentPage !== 'animalInfo' && styles.hide}
        ${styles.info_wrap}`}
      >
        <JoinAnimalInfo
          setCurrentPage={setCurrentPage}
          join={onSubmit}
          animal={animal}
          setAnimal={setAnimal}
        />
      </div>
      <div
        className={`${currentPage !== 'completion' && styles.hide}
        ${styles.info_wrap}`}
      >
        <div className={styles.completion_container}>
          <FontAwesomeIcon icon={faCircleCheck} className={styles.checkIcon} />
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
