import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './join_user_info.module.css';

import { useNavigate } from 'react-router-dom';
import { SignupValidation } from '../../../page/join/validation';
import { User } from '../../../page/join/JoinPage';
import Alert from '../../common/alert/alert';
import PopupDom from './popupDom';
import PopupPostCode from './popupPostCode';
import { emailCheck } from '../../../apis/user';
import InfoInput from '../infoInput';

interface JoinUserInfoProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
const JoinUserInfo: React.FunctionComponent<JoinUserInfoProps> = ({
  setCurrentPage,
  user,
  setUser,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [rePwError, setRePwError] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onValueCheck = async (
    e: React.FocusEvent<HTMLInputElement>
  ): Promise<string> => {
    const { name, value } = e.target;

    //이메일 중복 체크
    if (name === 'email') {
      const count = await emailCheck(value);
      if (count > 0) {
        onSetUser('', name);
        return '아이디가 존재합니다.';
      }
    }

    //가입자 정보 유효성 체크
    const result = SignupValidation(name, value, user)!;

    if (value == null || value == '') return '내용을 입력해주세요.';

    if (result === value) {
      //비밀번호 확인의 경우 가입자 정보에 입력하지 않음
      name !== 're_pw' ? onSetUser(value, name) : setRePwError(false);
      return '';
    } else {
      name !== 're_pw' ? onSetUser('', name) : setRePwError(true);
      return result;
    }
  };

  //가입자 정보 입력 // value가 string 타입이 아닐 경우 시도/시군구/동네 정보 입력
  const onSetUser = (value: string | any, name?: string) => {
    typeof value === 'string'
      ? setUser((user) => ({ ...user, [name!]: value }))
      : setUser((user) => ({ ...user, ...value }));
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    for (const key in user) {
      if (user[key] == null || user[key] === '' || rePwError === true) {
        //기입란이 비어있거나 비밀번호 확인에 오류가 있을 경우 alert
        setError(true);
        return;
      }
    }
    setCurrentPage('animalInfo');
  };

  return (
    <>
      <form className={styles.form_container}>
        <InfoInput onValueCheck={onValueCheck} title='* 이메일' name='email' />
        <InfoInput onValueCheck={onValueCheck} title='* 이름' name='name' />
        <InfoInput
          onValueCheck={onValueCheck}
          title='* 비밀번호'
          desc='8-15자의 영문, 숫자 또는 특수문자 조합'
          name='pw'
        />
        <InfoInput
          onValueCheck={onValueCheck}
          title='* 비밀번호 확인'
          desc='위의 비밀번호를 다시 입력해주세요.'
          name='re_pw'
        />
        <InfoInput
          onValueCheck={onValueCheck}
          title='* 핸드폰번호'
          desc="'-' 없이 번호만 입력해주세요."
          name='phone'
        />
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>* 주소</p>
          <div className={`${styles.address}`}>
            <input type='text' readOnly value={user.sido} />
            <input type='text' readOnly value={user.sigungu} />
            <input type='text' readOnly value={user.bname} />
            <div
              className={styles.searchBtn}
              onClick={() => setIsPopupOpen(true)}
            >
              검색
            </div>
          </div>
        </div>
        {/* 가입자 동네 정보 입력 다음 API*/}
        <div id='PopupDom' className={`${isPopupOpen && styles.popup}`}>
          {isPopupOpen && (
            <PopupDom>
              <PopupPostCode
                onPopupControl={setIsPopupOpen}
                onSetAddress={onSetUser}
              />
            </PopupDom>
          )}
        </div>
        <div className={styles.button_wrap}>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            홈
          </button>
          <button onClick={onSubmit} className={styles.submit}>
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
