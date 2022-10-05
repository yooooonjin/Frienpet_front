import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as homelessData from '../../apis/homeless';
import { RootState } from '../../modules';
import { removeHeartAnimal, setHeartAnimals } from '../../modules/heartAnimals';
import Heart from './heartAnimal';
import HeartAnimalInfo from './heartAnimalInfo';
import styles from './heartAnimals.module.css';
import Icon from '../common/icon/icon';

const HeartAnimals = ({ email }: { email: string }) => {
  const dispatch = useDispatch();
  const heartAnimals = useSelector((state: RootState) => state.heartAnimals);

  const [animalInfoPop, setAnimalInfoPop] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<
    homelessData.HeartAnimal & { beOver: boolean } & { end: boolean }
  >();
  const today = moment(new Date());

  //관심을 누른 동물 불러오기
  useEffect(() => {
    homelessData
      .getHeartAnimalInfo(email)
      .then((res) => dispatch(setHeartAnimals(res)));
  }, []);

  //동물 정보창 열기 //공모 상태 확인
  const onOpenInfo = (
    animal: homelessData.HeartAnimal,
    beOver: boolean,
    end: boolean
  ) => {
    setSelectedAnimal({ ...animal, beOver, end });
    setAnimalInfoPop(true);
  };

  //관심 동물 삭제하기
  const onDelete = async () => {
    await homelessData.deleteHeartAnimal(email, selectedAnimal?.noticeNo!);
    dispatch(removeHeartAnimal(selectedAnimal?.noticeNo!));
    setAnimalInfoPop(false);
  };

  return (
    <>
      <div className={styles.heartAnimal_container}>
        <div className={styles.heartAnimal}>
          {heartAnimals.length !== 0 &&
            heartAnimals?.map((animal, idx) => {
              return (
                <Heart
                  key={idx}
                  animal={animal}
                  today={today}
                  onOpenInfo={onOpenInfo}
                />
              );
            })}
          {heartAnimals.length === 0 && (
            <p className={styles.emptyMsg}>
              <span className={styles.heartIcon}>
                <Icon icon='Heart' />
              </span>
              하트를 눌러 관심 동물을 등록해주세요.
            </p>
          )}
        </div>
      </div>
      {animalInfoPop && selectedAnimal && (
        <HeartAnimalInfo
          setAnimalInfoPop={setAnimalInfoPop}
          selectedAnimal={selectedAnimal}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default HeartAnimals;
