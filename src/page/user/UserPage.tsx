import React from 'react';
import styles from './UserPage.module.css';
import { Animal } from '../join/JoinPage';
import { useEffect } from 'react';
import { useState } from 'react';
import { onUpload } from '../../service/fileUpload';
import { getPetInfo, updatePetInfo } from '../../apis/pet';
import { getPetPhoto, savePetPhoto } from '../../apis/photo';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import Button from '../../component/button/button';
import Icon from '../../component/icon/icon';

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
    size: '',
    color: '',
    feature: '',
  });
  const [myPetPhoto, setMyPetPhoto] = useState<Photo>({ 0: '', 1: '', 2: '' });
  const [editMode, setEditMode] = useState<boolean>(false);

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
        <p className={styles.userIcon}>
          <Icon icon='User' />
        </p>
        <div className={styles.userName}>{user?.name}</div>
        <div className={styles.userEmail}>{user?.email}</div>
      </div>
      <div className={styles.animal}>
        {editMode ? (
          <Button msg='저장하기' onClick={onEditModeChange} />
        ) : (
          <Button msg='수정하기' onClick={onEditModeChange} type='light' />
        )}
        <div className={styles.animal_wrap}>
          <div className={styles.animalInfo}>
            <input
              className={styles.animal_name}
              value={myPet.name}
              name='name'
              onChange={onChange}
              readOnly={editMode ? false : true}
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

            <div className={styles.animal_size_wrap}>
              <input
                type='number'
                className={styles.animal_size}
                value={myPet.size}
                name='size'
                onChange={onChange}
                readOnly={editMode ? false : true}
              />
              <span>kg</span>
            </div>
            <input
              className={styles.animal_color}
              value={myPet.color}
              name='color'
              onChange={onChange}
              readOnly={editMode ? false : true}
              placeholder='색깔'
            />
          </div>
          <textarea
            className={styles.animal_feature}
            value={myPet.feature}
            name='feature'
            onChange={onChange}
            readOnly={editMode ? false : true}
            placeholder='나의 반려동물의 특징을 적어주세요.'
          />
          <div className={styles.animal_photo}>
            {new Array(3).fill(1).map((_, idx) => {
              return (
                <label
                  className={`${styles.photo} ${editMode && styles.photoEdit}`}
                  htmlFor={`${idx}`}
                  key={idx}
                >
                  <input
                    type='file'
                    id={`${idx}`}
                    className={styles.photoInput}
                    onChange={fileUpload}
                    disabled={editMode ? false : true}
                  />
                  {myPetPhoto[idx] && (
                    <img src={myPetPhoto[idx]} className={styles.myPetImg} />
                  )}
                  {!myPetPhoto[idx] && (
                    <img src={`dog(${idx}).png`} className={styles.dogImg} />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
