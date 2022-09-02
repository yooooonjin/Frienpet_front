import React, { useEffect } from 'react';
import styles from './homeless_animal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { HomelessAnimalProps } from '../../page/homeless_page/homeless_page';

const HomelessAnimal: React.FunctionComponent<HomelessAnimalProps> = ({
  selectedAnimal,
}) => {
  // console.log(selectedAnimal);

  return (
    <section className={styles.homelessPet_container}>
      <div className={styles.homelessPet}>
        <div className={styles.info}>
          <div className={styles.noticeInfo}>
            <p className={styles.noticeNumber}>{selectedAnimal?.noticeNo}</p>
            <p className={styles.noticePeriod}>
              {selectedAnimal?.noticeSdt} ~ {selectedAnimal?.noticeEdt}
            </p>
          </div>
          <div className={styles.animalInfo}>
            <img
              className={styles.image}
              src={selectedAnimal?.popfile}
              alt='image'
            />
            <div>
              <div className={styles.character}>
                <p
                  className={`${styles.gender} ${
                    selectedAnimal?.sexCd == 'F' ? styles.female : styles.male
                  }`}
                >
                  {selectedAnimal?.sexCd == 'F' ? '암컷' : '수컷'}
                  {selectedAnimal?.neuterYn === 'Y' && <span>중</span>}
                </p>
                <p className={styles.kind}>{selectedAnimal?.kindCd}</p>
              </div>
              <div className={styles.privacy}>
                <p>
                  <span>나이 : </span> {selectedAnimal?.age}
                </p>
                <p>
                  <span>체중 : </span> {selectedAnimal?.weight}
                </p>
              </div>
              <div className={styles.feature}>
                {selectedAnimal?.specialMark}
              </div>
              <div className={styles.rescueInfo}>
                <p>
                  <span>접수일시 : </span>
                  {selectedAnimal?.happenDt.slice(0, 4) +
                    '-' +
                    selectedAnimal?.happenDt.slice(4, 6) +
                    '-' +
                    selectedAnimal?.happenDt.slice(6, 8)}
                </p>
                <p>
                  <span>발견장소 : </span> {selectedAnimal?.happenPlace}
                </p>
              </div>
              <div className={styles.shelterInfo}>
                <p>
                  <span>{selectedAnimal?.careNm} </span>
                  <FontAwesomeIcon icon={faPhone} /> {selectedAnimal?.careTel}
                </p>
                <p>{selectedAnimal?.careAddr}</p>
                <p>
                  <span>관할기관 : </span>
                  {selectedAnimal?.orgNm}
                </p>
              </div>
            </div>
          </div>
          <p className={styles.remark}>
            *유기동물 문의는 보호센터에 연락하시기 바랍니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomelessAnimal;
