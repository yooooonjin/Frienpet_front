import React from 'react';
import styles from './UserPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Animal } from '../join/JoinPage';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { onUpload } from '../../service/fileUpload';
import { getPetInfo, updatePetInfo } from '../../apis/pet';
import { getPetPhoto, savePetPhoto } from '../../apis/photo';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

type Photo = {
  [key: string]: string;
};

const UserPage = () => {
  const user = useSelector((state: RootState) => state.user.loggedInfo);

  const [myPet, setMyPet] = useState<Animal>({
    petid: '',
    name: '',
    upkind: '',
    kind: '',
    gender: '',
    weight: '',
    character: '',
  });
  const [myPetPhoto, setMyPetPhoto] = useState<Photo>({ 0: '', 1: '', 2: '' });
  const [editMode, setEditMode] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  console.log(myPet);

  useEffect(() => {
    const getPetData = async () => {
      try {
        const result = await getPetInfo(user!.email);
        setMyPet(result);
        getMyPetPhoto(result.petid);
      } catch (error) {
        console.log(error);
      }
    };
    getPetData();
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMyPet((myPet) => {
      return { ...myPet, [name]: value };
    });
  };

  const onEditModeChange = async () => {
    if (editMode) {
      setEditMode(false);
      await updatePetInfo(myPet);
    } else {
      setEditMode(true);
      nameRef.current!.focus();
    }
  };

  const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await onUpload(e.target.files);
    const url = result.data.url;
    const order = e.target.id;
    const petid = myPet.petid;
    await savePetPhoto({ petid, url, order });
    getMyPetPhoto(petid);
  };

  const getMyPetPhoto = async (petid: string) => {
    try {
      const result = await getPetPhoto(petid);
      const data: Array<any> = result;
      let newPhoto = {};
      data.forEach((photo) => {
        newPhoto = { ...newPhoto, [photo.order]: photo.url };
      });
      setMyPetPhoto(newPhoto);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.user_container}>
      <div className={styles.user}>
        <FontAwesomeIcon icon={faCircleUser} className={styles.userIcon} />
        <div className={styles.userName}>{user?.name}</div>
        <div className={styles.userEmail}>{user?.email}</div>
      </div>
      <div className={styles.animal}>
        <div
          className={`${styles.button} ${editMode && styles.edit}`}
          onClick={onEditModeChange}
        >
          {editMode ? '저장하기' : '수정하기'}
        </div>
        <div className={styles.animal_wrap}>
          <div className={styles.animalInfo}>
            <input
              className={styles.animal_name}
              value={myPet.name}
              name='name'
              onChange={onChange}
              readOnly={editMode ? false : true}
              ref={nameRef}
              placeholder='이름'
            />
            <select
              name='upkind'
              value={myPet.upkind}
              onChange={onChange}
              disabled={editMode ? false : true}
            >
              <option value=''>축종</option>
              <option value='개'>개</option>
              <option value='고양이'>고양이</option>
              <option value='기타'>기타</option>
            </select>
            <input
              className={styles.animal_kind}
              value={myPet.kind}
              name='kind'
              onChange={onChange}
              readOnly={editMode ? false : true}
              placeholder='품종'
            />
            <select
              name='gender'
              value={myPet.gender}
              onChange={onChange}
              disabled={editMode ? false : true}
            >
              <option value=''>성별</option>
              <option value='M'>수컷</option>
              <option value='F'>암컷</option>
            </select>

            <div className={styles.animal_weight_wrap}>
              <input
                type='number'
                className={styles.animal_weight}
                value={myPet.weight}
                name='weight'
                onChange={onChange}
                readOnly={editMode ? false : true}
              />
              <span>kg</span>
            </div>
            <input
              className={styles.animal_color}
              value='흰색'
              name='color'
              onChange={onChange}
              readOnly={editMode ? false : true}
              placeholder='색깔'
            />
          </div>
          <textarea
            className={styles.animal_character}
            value={myPet.character}
            name='character'
            onChange={onChange}
            readOnly={editMode ? false : true}
            placeholder='나의 반려동물의 특징을 적어주세요.'
          />
          <div className={styles.animal_photo}>
            <label
              className={`${styles.photo} ${editMode && styles.photoEdit}`}
              htmlFor='0'
            >
              <input
                type='file'
                id='0'
                className={styles.photoInput}
                onChange={fileUpload}
                disabled={editMode ? false : true}
              />
              {myPetPhoto[0] && (
                <img src={myPetPhoto['0']} className={styles.myPetImg} />
              )}
              {!myPetPhoto[0] && (
                <img src='dog(0).png' className={styles.dogImg} />
              )}
            </label>
            <label
              className={`${styles.photo} ${editMode && styles.photoEdit}`}
              htmlFor='1'
            >
              <input
                type='file'
                id='1'
                className={styles.photoInput}
                onChange={fileUpload}
                disabled={editMode ? false : true}
              />
              {myPetPhoto[1] && (
                <img src={myPetPhoto[1]} className={styles.myPetImg} />
              )}
              {!myPetPhoto[1] && (
                <img src='dog(1).png' className={styles.dogImg} />
              )}
            </label>
            <label
              className={`${styles.photo} ${editMode && styles.photoEdit}`}
              htmlFor='2'
            >
              <input
                type='file'
                id='2'
                className={styles.photoInput}
                onChange={fileUpload}
                disabled={editMode ? false : true}
              />
              {myPetPhoto[2] && (
                <img src={myPetPhoto[2]} className={styles.myPetImg} />
              )}
              {!myPetPhoto[2] && (
                <img src='dog(2).png' className={styles.dogImg} />
              )}
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
