import React, { Dispatch, SetStateAction } from 'react';
import useInput from '../../../hooks/useInput';
import { Animal, initAnimal } from '../../../page/join/JoinPage';
import InfoInput from '../infoInput/infoInput';
import styles from './join_animal_info.module.css';

export interface JoinAnimalInfoProps {
  setCurrentPage: Dispatch<SetStateAction<string>>;
  join(animal: Animal): void;
}

const JoinAnimalInfo: React.FunctionComponent<JoinAnimalInfoProps> = ({
  setCurrentPage,
  join,
}) => {
  const [form, onChange] = useInput<Animal>(initAnimal);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    join(form);
    setCurrentPage('completion');
  };
  return (
    <form className={styles.form_container}>
      <p className={styles.form_desc}>*가입 후 등록 또는 수정이 가능합니다.</p>
      <InfoInput title='반려 동물 이름' name='name' onChange={onChange} />
      <div className={styles.row}>
        <InfoInput title='축종' name='upkind' onChange={onChange} />
        <InfoInput title='품종' name='kind' onChange={onChange} />
      </div>
      <div className={styles.row}>
        <InfoInput title='성별' name='gender' onChange={onChange} />
        <InfoInput title='몸무게' name='size' onChange={onChange} />
        <InfoInput title='색깔' name='color' onChange={onChange} />
      </div>
      <InfoInput title='특징' name='feature' onChange={onChange} />
      <div className={styles.button_wrap}>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('userInfo');
          }}
        >
          이전
        </button>
        <button className={styles.submit} onClick={onSubmit}>
          가입하기
        </button>
      </div>
    </form>
  );
};

export default JoinAnimalInfo;
