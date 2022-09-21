import React, { useEffect, useState } from 'react';
import styles from './lostInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { LostAnimal } from '../../page/lostPet/LostPetPage';

interface LostInfoProps {
  lostInfo: LostAnimal;
}

const LostInfo: React.FunctionComponent<LostInfoProps> = ({ lostInfo }) => {
  return (
    <div className={styles.animal}>
      <div className={styles.info}>
        <div className={styles.lostInfo}>
          <div className={styles.location}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.locationIcon}
            />
            <div>{lostInfo.location}</div>
          </div>
          <div className={styles.basicLostInfo}>
            <div className={styles.address}>
              {lostInfo.sido} &gt; {lostInfo.sigungu} &gt; {lostInfo.bname}
            </div>
            <div className={styles.datetime}>
              <div className={styles.date}>
                {moment(lostInfo.createddate).format('MM월 DD일')}
              </div>
              <div className={styles.time}>
                <FontAwesomeIcon icon={faClock} className={styles.clockIcon} />
                {moment(lostInfo.createddate).format('HH시 mm분')}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.animalPhoto}>
          {lostInfo.photo.map((photo, idx) => {
            return <img className={styles.photo} src={photo.url} key={idx} />;
          })}
        </div>
        <div className={styles.character}>
          {lostInfo.upkind && <div>[ {lostInfo.upkind} ]</div>}
          {lostInfo.kind && <div>{lostInfo.kind}</div>}
          {lostInfo.color && <div>{lostInfo.color}</div>}
          {lostInfo.weight && <div>{lostInfo.weight}kg</div>}
          {lostInfo.gender && (
            <div>{lostInfo.gender === 'F' ? '암컷' : '수컷'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostInfo;
