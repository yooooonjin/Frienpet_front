import moment from 'moment';
import React, { useState } from 'react';
import { LostAnimal } from '../../page/lostPet/LostPetPage';
import styles from './infoSharing.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faSquarePhone,
} from '@fortawesome/free-solid-svg-icons';
import Chat from '../chat/chat';
import storage from '../../service/storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

interface InfoSharingProps {
  lostMyPet?: LostAnimal;
  helping?: LostAnimal;
  onDelete(e: React.MouseEvent<HTMLDivElement>): void;
}
const InfoSharing: React.FunctionComponent<InfoSharingProps> = ({
  lostMyPet,
  helping,
  onDelete,
}) => {
  const { name } = useSelector((state: RootState) => state.user.loggedInfo);
  const lostInfo = lostMyPet ? lostMyPet : helping;
  const roomId = lostInfo!.lostpetid!;

  return (
    <section className={styles.lostMyPet}>
      <div className={styles.title}>
        <p>{lostMyPet ? '나의 반려견 찾기' : '우리동네 반려견 찾기'}</p>
        <div id={lostMyPet ? 'myLostPet' : 'helping'} onClick={onDelete}>
          삭제
        </div>
      </div>
      <div className={styles.address}>
        {lostInfo?.sido} &gt; {lostInfo?.sigungu} &gt; {lostInfo?.bname}
      </div>
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
          {/* {lostInfo?.helpers && (
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
          )} */}
          {helping && (
            <p className={styles.guardianInfo}>
              <FontAwesomeIcon
                icon={faSquarePhone}
                className={styles.guardianInfoIcon}
              />{' '}
              {lostInfo?.phone}
            </p>
          )}
        </div>
        <Chat roomId={roomId} userId={name} />
      </form>
    </section>
  );
};

export default InfoSharing;
