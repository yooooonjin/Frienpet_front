import moment from 'moment';
import React from 'react';
import { LostAnimal } from '../../page/lostPet/LostPetPage';
import styles from './infoSharing.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faPaperPlane,
  faSquarePhone,
} from '@fortawesome/free-solid-svg-icons';

interface InfoSharingProps {
  lostInfo?: LostAnimal;
}
const InfoSharing: React.FunctionComponent<InfoSharingProps> = ({
  lostInfo,
}) => {
  console.log(lostInfo);

  return (
    <section className={styles.lostMyPet}>
      <p className={styles.title}>
        {lostInfo?.helpers ? '나의 반려견 찾기' : '우리동네 반려견 찾기'}
      </p>
      <div className={styles.lostInfo}>
        <FontAwesomeIcon icon={faLocationDot} className={styles.locationIcon} />
        <div>{lostInfo?.location}</div>
        <div className={styles.date}>
          {moment(lostInfo?.createddate).format('MM월 DD일')}
        </div>
        <div className={styles.time}>
          {moment(lostInfo?.createddate).format('HH시 mm분')}
        </div>
      </div>
      <form className={styles.chat}>
        <div className={styles.participant}>
          <p>실시간 정보 공유</p>
          {lostInfo?.helpers && (
            <div className={styles.helpersInfo}>
              <div className={`${styles.helper} ${styles.me}`}>나</div>
              {lostInfo?.helpers?.map((helper, idx) => {
                return (
                  <div className={styles.helper} key={idx}>
                    {helper.name.substring(0, 1)}
                  </div>
                );
              })}
            </div>
          )}
          {!lostInfo?.helpers && (
            <p className={styles.guardianInfo}>
              <FontAwesomeIcon
                icon={faSquarePhone}
                className={styles.guardianInfoIcon}
              />{' '}
              {lostInfo?.phone}
            </p>
          )}
        </div>
        <div className={styles.chatting}></div>
        <div className={styles.send}>
          <textarea name='' id=''></textarea>
          <button className={styles.sendBtn}>
            <FontAwesomeIcon icon={faPaperPlane} className={styles.sendIcon} />
          </button>
        </div>
      </form>
    </section>
  );
};

export default InfoSharing;
