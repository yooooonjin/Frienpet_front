import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, login } from '../../apis/user';
import styles from './LoginPage.module.css';
import { setLoggedInfo } from '../../modules/user';
import storage from '../../service/storage';
import Alert from '../../component/common/alert/alert';
import useInput from '../../hooks/useInput';

type LoginUser = {
  email: string;
  pw: string;
};

const initLogin = {
  email: '',
  pw: '',
};

const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [form, onChange, reset] = useInput<LoginUser>(initLogin);

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await login(form);
      if (!result.data) {
        setError(true);
      } else {
        const loggedInfo = await getUserInfo(form.email);
        storage.set('loggedInfo', loggedInfo);
        dispatch(setLoggedInfo(loggedInfo));
        window.location.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.login_container}>
      <img
        src='logo_icon.png'
        alt='logo'
        className={styles.logo}
        onClick={() => {
          navigate('/');
        }}
      />
      <form className={styles.form_container}>
        <div className={styles.input}>
          <input
            type='text'
            name='email'
            placeholder='email'
            onChange={onChange}
          />
        </div>
        <div className={styles.input}>
          <input
            type='password'
            name='pw'
            placeholder='password'
            onChange={onChange}
          />
        </div>
        <button className={styles.button} onClick={onLogin}>
          회원 로그인
        </button>
      </form>
      <div className={styles.account}>
        <div
          onClick={() => {
            navigate('/join');
          }}
        >
          회원가입
        </div>
      </div>
      {error && (
        <Alert
          message='아이디 혹은 비밀번호가 일치하지 않습니다.<br/>다시 한 번 확인해주세요.'
          setError={setError}
        />
      )}
    </section>
  );
};

export default LoginPage;
