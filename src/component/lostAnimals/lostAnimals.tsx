import React, { useEffect, useState } from 'react';
import styles from './lostAnimals.module.css';
import { useNavigate } from 'react-router-dom';
import { getHelpers, getLostAnimals } from '../../apis/lostPet';
import { LostAnimal } from '../../page/lostPet/LostPetPage';
import { getPetInfo } from '../../apis/pet';
import { getPetPhoto } from '../../apis/photo';
import LostInfo from '../lostInfo/lostInfo';
import { Animal } from '../../page/join/JoinPage';

const LostAnimals = () => {
  const [lostAnimals, setLostAnimals] = useState<Array<LostAnimal>>();
  const navigate = useNavigate();
  useEffect(() => {
    getLostAnimalsData();
  }, []);

  const getLostAnimalsData = async () => {
    const result = await getLostAnimals(true, 'all', '');
    let lostPetInfo: Array<LostAnimal> = [];

    for (const lostpet of result) {
      const petInfo = await getPetInfo(lostpet.userid!);
      const petPhoto = await getPetPhoto(lostpet.petid!);
      const lostInfo = {
        ...lostpet,
        ...petInfo,
        photo: petPhoto,
      };
      lostPetInfo.push(lostInfo);
    }
    setLostAnimals(lostPetInfo);
  };
  return (
    <section className={styles.lostPet_container}>
      <div className={styles.lostPet}>
        <h2
          className={styles.title}
          onClick={() => {
            navigate('/lostPet');
          }}
        >
          함께 우리동네 반려동물 찾기<span className={styles.more}>▶</span>
        </h2>
        <p className={styles.subTitle}>
          우리동네 잃어버린 반려동물입니다. 집에 무사히 도착할 수 있도록
          도와주세요.
        </p>
        <div className={styles.info_container}>
          <div className={styles.lostAnimals}>
            {lostAnimals?.map((lostInfo) => {
              return (
                <div className={styles.animal_wrap} key={lostInfo.lostpetid}>
                  <LostInfo lostInfo={lostInfo} key={lostInfo.lostpetid} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostAnimals;
