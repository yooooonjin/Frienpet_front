import React from 'react';
import { JoinAnimalInfoProps } from '../../../page/join/JoinPage';
import styles from './join_animal_info.module.css';

const JoinAnimalInfo: React.FunctionComponent<JoinAnimalInfoProps> = ({
  setCurrentPage,
  join,
  animal,
  setAnimal,
}) => {
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setAnimal((animal) => {
      return { ...animal, [name]: value };
    });
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    join();
    setCurrentPage('completion');
  };
  return (
    <form className={styles.form_container}>
      <p className={styles.form_desc}>*가입 후 등록 또는 수정이 가능합니다.</p>
      <div className={styles.info_wrap}>
        <p className={styles.info_title}>반려 동물 이름</p>
        <div className={styles.input}>
          <input type='text' name='name' onChange={onChange} />
        </div>
      </div>
      <div className={styles.info_wrap}>
        <p className={styles.info_title}>축종</p>
        <div className={styles.upkind_wrap}>
          <div className={styles.upkind}>
            <select name='upkind' onChange={onChange}>
              <option value=''>선택</option>
              <option value='개'>개</option>
              <option value='고양이'>고양이</option>
              <option value='기타'>기타</option>
            </select>
          </div>
          <div className={styles.upkind}>
            <span>품종 : </span>
            <input type='text' name='kind' onChange={onChange} />
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>성별</p>
          <div className={styles.radio_wrap}>
            <input
              type='radio'
              name='gender'
              id='female'
              value='F'
              className={styles.gender}
              onChange={onChange}
            />
            <label htmlFor='female' className={styles.gender_label}>
              암컷
            </label>
            <input
              type='radio'
              name='gender'
              id='male'
              value='M'
              className={styles.gender}
              onChange={onChange}
            />
            <label htmlFor='male' className={styles.gender_label}>
              수컷
            </label>
          </div>
        </div>
        <div className={styles.info_wrap}>
          <p className={styles.info_title}>몸무게</p>
          <div className={styles.input}>
            <input type='number' name='weight' onChange={onChange} />
            <div className={styles.kg}>kg</div>
          </div>
          <p className={styles.errorMsg}></p>
        </div>
      </div>
      <div className={styles.info_wrap}>
        <p className={styles.info_title}>특징</p>
        <div className={styles.input}>
          <textarea name='character' onChange={onChange} />
        </div>
        <p className={styles.errorMsg}></p>
      </div>
      <div className={styles.info_wrap}>
        <p className={styles.info_title}>사진</p>
        <div className={styles.input}>
          <input type='email' name='photo' onChange={onChange} />
        </div>
        <p className={styles.errorMsg}></p>
      </div>
      <div className={styles.button_wrap}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('userInfo');
          }}
          className={`${styles.button} ${styles.cancel}`}
        >
          이전
        </button>
        <button
          className={`${styles.button} ${styles.submit}`}
          onClick={onSubmit}
        >
          가입하기
        </button>
      </div>
    </form>
  );
};

export default JoinAnimalInfo;
