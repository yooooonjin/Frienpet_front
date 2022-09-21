import React, { useState } from 'react';
import styles from './join_user_info.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import Sido from '../../../component/homeless/sido';
import SiGunGu from '../../../component/homeless/sigungu';
import { useNavigate } from 'react-router-dom';
import { SignupValidation } from '../../../page/join/validation';
import { JoinUserInfoProps, User } from '../../../page/join/JoinPage';
import Alert from '../../alert/alert';
import { addrlink } from '../../../service/address';
import PopupDom from './popupDom';
import PopupPostCode from './popupPostCode';

const JoinUserInfo: React.FunctionComponent<JoinUserInfoProps> = ({
  setCurrentPage,
  user,
  setUser,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [rePwError, setRePwError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onValueCheck = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, parentNode, parentElement, nextElementSibling } =
      e.target;
    const result = SignupValidation(name, value, user)!;
    if (value == null || value == '') {
      parentNode!.nextSibling!.textContent = '내용을 입력해주세요.';
      parentElement!.classList.add(`${styles.error}`);
      return;
    }
    if (result === value) {
      nextElementSibling!.classList.add(`${styles.check}`);
      parentNode!.nextSibling!.textContent = '';
      parentElement!.classList.remove(`${styles.error}`);
      if (name !== 're_pw') {
        setUser((user) => {
          return { ...user, [name]: result };
        });
      } else {
        setRePwError(false);
      }
    } else {
      nextElementSibling!.classList.remove(`${styles.check}`);
      parentNode!.nextSibling!.textContent = result;
      parentElement!.classList.add(`${styles.error}`);
      if (name !== 're_pw') {
        setUser((user) => {
          return { ...user, [name]: '' };
        });
      } else {
        setRePwError(true);
      }
    }
  };

  // const onAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setUser((user: User): User => {
  //     return { ...user, [name]: value };
  //   });
  // };

  // const onSigunguReset = () => {
  //   setUser((user: User): User => {
  //     return { ...user, org_cd: '' };
  //   });
  // };

  const onSetAddress = (data: any) => {
    setUser((user) => {
      return { ...user, ...data };
    });
  };

  const onPopupControl = (toChange: boolean) => {
    setIsPopupOpen(toChange);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(user);
    for (const key in user) {
      if (user[key] == null || user[key] === '' || rePwError === true) {
        setError(true);
        return;
      }
    }
    setCurrentPage('animalInfo');
  };

  return (
    <>
      <form className={styles.form_container}>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>* 이메일</p>
          <div className={styles.input}>
            <input type='email' name='email' id='email' onBlur={onValueCheck} />
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.checkIcon}
            />
          </div>
          <p className={styles.errorMsg}></p>
        </div>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>* 이름</p>
          <div className={styles.input}>
            <input type='text' name='name' id='name' onBlur={onValueCheck} />
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.checkIcon}
            />
          </div>
          <p className={styles.errorMsg}></p>
        </div>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>
            * 비밀번호
            <span className={styles.desc}>
              8-15자의 영문, 숫자 또는 특수문자 조합
            </span>
          </p>
          <div className={styles.input}>
            <input type='password' name='pw' id='pw' onBlur={onValueCheck} />
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.checkIcon}
            />
          </div>
          <p className={styles.errorMsg}></p>
        </div>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>
            * 비밀번호 확인
            <span className={styles.desc}>
              위의 비밀번호를 다시 입력해주세요.
            </span>
          </p>
          <div className={styles.input}>
            <input
              type='password'
              name='re_pw'
              id='re_pw'
              onBlur={onValueCheck}
            />
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.checkIcon}
            />
          </div>
          <p className={styles.errorMsg}></p>
        </div>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>
            * 핸드폰번호
            <span className={styles.desc}>'-' 없이 번호만 입력해주세요. </span>
          </p>
          <div className={styles.input}>
            <input type='text' name='phone' id='phone' onBlur={onValueCheck} />
            <FontAwesomeIcon
              icon={faCircleCheck}
              className={styles.checkIcon}
            />
          </div>
          <p className={styles.errorMsg}></p>
        </div>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>* 주소</p>
          <div className={`${styles.address}`}>
            <input type='text' readOnly value={user.sido} />
            <input type='text' readOnly value={user.sigungu} />
            <input type='text' readOnly value={user.bname} />
            <div
              className={styles.searchBtn}
              onClick={() => onPopupControl(true)}
            >
              검색
            </div>
          </div>
        </div>
        <div id='PopupDom' className={styles.popup}>
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode
                onPopupControl={onPopupControl}
                onSetAddress={onSetAddress}
              />
            </PopupDom>
          )}
        </div>
        {/* <div className={styles.info_wrap}>
          <p className={styles.info_title}>* 주소</p>
          <div className={styles.address_wrap}>
            <div className={styles.address}>
              <span>지역 : </span>
              <Sido onSidoChange={onAddressChange} />
            </div>
            <div className={styles.address}>
              <span>세부 지역 : </span>
              <SiGunGu
                selectedSido={user.upr_cd}
                onFilterChange={onAddressChange}
                onReset={onSigunguReset}
              />
            </div>
          </div>
        </div> */}
        <div className={styles.button_wrap}>
          <button
            onClick={() => {
              navigate('/');
            }}
            className={`${styles.button} ${styles.cancel}`}
          >
            홈
          </button>
          <button
            onClick={onSubmit}
            className={`${styles.button} ${styles.submit}`}
          >
            다음
          </button>
        </div>
      </form>
      {error && (
        <Alert
          message='올바르지 않은 정보가 있습니다.<br/>다시 한 번 확인해주세요.'
          setError={setError}
        />
      )}
    </>
  );
};

export default JoinUserInfo;
