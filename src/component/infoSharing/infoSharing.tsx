import React from 'react';
import { LostPet } from '../../page/lostPet/LostPetPage';
import styles from './infoSharing.module.css';
import Chat from '../chat/chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import DateTime from '../common/dateTime/dateTime';
import Location from '../common/location/location';
import Address from '../common/address/address';
import Icon from '../common/icon/icon';

interface InfoSharingProps {
  lostMyPet?: LostPet;
  helping?: LostPet;
  onDelete(e: React.MouseEvent<HTMLDivElement>): void;
}
const InfoSharing: React.FunctionComponent<InfoSharingProps> = ({
  lostMyPet,
  helping,
  onDelete,
}) => {
  const { name } = useSelector((state: RootState) => state.user.loggedInfo);
  const lostInfo = (lostMyPet ? lostMyPet : helping) as LostPet;
  const roomId = lostInfo!.lostpetid!;

  return (
    <section className={styles.lostMyPet}>
      <div className={styles.title}>
        <p>{lostMyPet ? '나의 반려견 찾기' : '우리동네 반려견 찾기'}</p>
        <div id={lostMyPet ? 'myLostPet' : 'helping'} onClick={onDelete}>
          삭제
        </div>
      </div>
      <Address address={lostInfo} />
      <div className={styles.lostInfo}>
        <Location location={lostInfo.location} />
        <DateTime dateTime={lostInfo.createddate!} />
      </div>
      <form className={styles.chat}>
        <div className={styles.participant}>
          {helping && (
            <p className={styles.guardianInfo}>
              <span className={styles.guardianInfoIcon}>
                <Icon icon='Phone' />
              </span>
              {lostInfo.phone}
            </p>
          )}
        </div>
        <Chat roomId={roomId} userId={name} />
      </form>
    </section>
  );
};

export default InfoSharing;
