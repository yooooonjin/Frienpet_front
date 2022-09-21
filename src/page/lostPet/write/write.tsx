import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './write.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useInput from '../../../hooks/useInput';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { LostPet } from '../LostPetPage';
import { getPetInfo } from '../../../apis/pet';
import { saveLostpet } from '../../../apis/lostPet';
import storage from '../../../service/storage';

interface WriteProps {
  setLostPetPop: React.Dispatch<SetStateAction<boolean>>;
  getLostAnimalsData(): void;
  userid: string;
  userphone?: string;
}

const Write: React.FunctionComponent<WriteProps> = ({
  setLostPetPop,
  getLostAnimalsData,
  userid,
  userphone,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [basicInfo, setBasicInfo] = useState({
    userid: userid,
    petid: '',
    sido: storage.get('loggedInfo')?.sido,
    sigungu: storage.get('loggedInfo')?.sigungu,
    bname: storage.get('loggedInfo')?.bname,
    phone: userphone,
  });

  const [form, onChange, reset] = useInput<LostPet>({
    location: '',
    desc: '',
  });
  useEffect(() => {
    reset();
    formRef.current?.reset();
  }, []);

  useEffect(() => {
    getPetInfo(userid).then((res) => {
      setBasicInfo({ ...basicInfo, petid: res.petid });
    });
  }, []);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (form.location == '' || form.desc == '') {
      return;
    }
    await saveLostpet({
      ...basicInfo,
      ...form,
    });
    setLostPetPop(false);
    getLostAnimalsData();
  };

  return (
    <section>
      <div className={styles.dim}></div>
      <form ref={formRef} className={styles.write_popup}>
        <div className={styles.close} onClick={() => setLostPetPop(false)}>
          <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} />
        </div>
        <div className={styles.location}>
          <div className={styles.detailLocation}>
            <p>*상세위치:</p>
            <input type='text' name='location' onChange={onChange} />
          </div>
        </div>
        <div className={styles.character}>
          <div className={styles.line}></div>
          <div className={styles.desc}>
            <p>상세 설명</p>
            <textarea name='desc' onChange={onChange}></textarea>
          </div>
        </div>
        <button className={styles.button} onClick={onSubmit}>
          반려 동물 입력
        </button>
      </form>
    </section>
  );
};

export default Write;
