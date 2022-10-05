import React, { useEffect, useState } from 'react';
import styles from './homelessAnimalInfo.module.css';
import { HomelessAnimalProps } from '../../page/homeless/HomelessPage';
import { deleteHeartAnimal, saveHeartAnimalInfo } from '../../apis/homeless';
import { useDispatch } from 'react-redux';
import { addHeartAnimal, removeHeartAnimal } from '../../modules/heartAnimals';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import DateFormat from '../common/dateFormat/dateFormat';
import Icon from '../common/icon/icon';

const HomelessAnimalInfo: React.FunctionComponent<HomelessAnimalProps> = ({
  selectedAnimal,
  email,
}) => {
  const { noticeNo, filename, careNm, careTel, noticeEdt } = selectedAnimal;
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(false);
  const heartAnimalsNoticeNo = useSelector((state: RootState) =>
    state.heartAnimals.map((animal) => animal.noticeNo)
  );

  //관심 동물 클릭시 하트 활성화된 상태로 표출
  useEffect(() => {
    const alreadyHeartExist = heartAnimalsNoticeNo.findIndex(
      (animalsNoticeNo) => noticeNo === animalsNoticeNo
    );
    alreadyHeartExist === -1 ? setHeart(false) : setHeart(true);
  }, [selectedAnimal]);

  //관심 하트 누르기
  const onHeartClick = async () => {
    if (heart) {
      await deleteHeartAnimal(email, noticeNo);
      dispatch(removeHeartAnimal(noticeNo));
      setHeart(false);
    } else {
      const animalInfo = {
        userId: email,
        noticeNo,
        filename,
        careNm,
        careTel,
        noticeEdt,
      };
      await saveHeartAnimalInfo(animalInfo);
      dispatch(addHeartAnimal(animalInfo));
      setHeart(true);
    }
  };

  return (
    <section className={styles.homelessPet_container}>
      <div className={styles.info}>
        <div className={styles.header}>
          <div className={styles.noticeInfo}>
            <p className={styles.noticeNumber}>{selectedAnimal.noticeNo}</p>
            <p className={styles.noticePeriod}>
              {selectedAnimal.noticeSdt} ~ {selectedAnimal.noticeEdt}
            </p>
          </div>
          <div
            onClick={onHeartClick}
            className={`${styles.heartIcon} ${heart && styles.heart}`}
          >
            <Icon icon='Heart' />
          </div>
        </div>
        <div className={styles.animalInfo}>
          <img
            className={styles.image}
            src={selectedAnimal.popfile}
            alt='image'
          />
          <div className={styles.animalInfo_text}>
            <div className={styles.character}>
              <p
                className={`${styles.gender} ${
                  selectedAnimal.sexCd == 'F' ? styles.female : styles.male
                }`}
              >
                {selectedAnimal.sexCd == 'F' ? '암컷' : '수컷'}
                {selectedAnimal.neuterYn === 'Y' && <span>중</span>}
              </p>
              <p className={styles.kind}>{selectedAnimal.kindCd}</p>
            </div>
            <div className={styles.privacy}>
              <p>
                <span>나이 : </span> {selectedAnimal.age}
              </p>
              <p>
                <span>체중 : </span> {selectedAnimal.weight}
              </p>
            </div>
            <div className={styles.feature}>{selectedAnimal.specialMark}</div>
            <div className={styles.rescueInfo}>
              <p>
                <span>접수일시 : </span>
                <DateFormat date={selectedAnimal.happenDt} division='-' />
              </p>
              <p>
                <span>발견장소 : </span> {selectedAnimal.happenPlace}
              </p>
            </div>
            <div className={styles.shelterInfo}>
              <p>
                <span>{selectedAnimal.careNm} </span>
                <Icon icon='Phone' /> {selectedAnimal.careTel}
              </p>
              <p>{selectedAnimal.careAddr}</p>
              <p>
                <span>관할기관 : </span>
                {selectedAnimal.orgNm}
              </p>
            </div>
          </div>
        </div>
        <p className={styles.remark}>
          *유기동물 문의는 보호센터에 연락하시기 바랍니다.
        </p>
      </div>
    </section>
  );
};

export default HomelessAnimalInfo;
