import React, { useEffect, useState } from 'react';
import styles from './lostAnimals.module.css';
import { getLostAnimals } from '../../apis/lostPet';
import { LostAnimal } from '../../page/lostPet/LostPetPage';
import { getPetInfo } from '../../apis/pet';
import { getPetPhoto } from '../../apis/photo';
import LostInfo from '../lostInfo/lostInfo';
import LostInfoSkeleton from '../lostInfo/skeleton/lostInfoSkeleton';
import Title from '../title/title';

const LostAnimals = () => {
  const [lostAnimals, setLostAnimals] = useState<Array<LostAnimal>>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLostAnimalsData();
  }, []);

  const getLostAnimalsData = async () => {
    setIsLoading(true);
    const result = await getLostAnimals(true, 'all', '');
    let lostPetInfo: Array<LostAnimal> = [];

    for (const lostpet of result) {
      const petInfo = await getPetInfo(lostpet.userid!);
      const photo = await getPetPhoto(lostpet.petid!);
      const lostInfo = {
        ...lostpet,
        ...petInfo,
        photo,
      };
      lostPetInfo.push(lostInfo);
    }
    setLostAnimals(lostPetInfo);
    setIsLoading(false);
  };
  return (
    <section className={styles.lostPet_container}>
      <div className={styles.lostPet}>
        <Title
          title='함께 우리동네 반려동물 찾기'
          subTitle='우리동네 잃어버린 반려동물입니다. 집에 무사히 도착할 수 있도록
          도와주세요.'
          page='lostPet'
        />
        <div className={styles.info_container}>
          <div className={styles.lostAnimals}>
            {isLoading ? (
              <LostInfoSkeleton />
            ) : (
              lostAnimals?.map((lostInfo) => {
                return (
                  <div className={styles.animal_wrap} key={lostInfo.lostpetid}>
                    <LostInfo lostInfo={lostInfo} key={lostInfo.lostpetid} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostAnimals;
