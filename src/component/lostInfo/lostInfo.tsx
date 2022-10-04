import React from 'react';
import styles from './lostInfo.module.css';
import { LostAnimal } from '../../page/lostPet/LostPetPage';
import DateTime from '../dateTime/dateTime';
import Address from '../address/address';
import Location from '../location/location';
import Character from '../character/character';

const LostInfo = ({ lostInfo }: { lostInfo: LostAnimal }) => {
  return (
    <div className={styles.animal}>
      <div className={styles.info}>
        <div className={styles.lostInfo}>
          <Location location={lostInfo.location} />
          <div className={styles.basicLostInfo}>
            <Address address={lostInfo} />
            <DateTime dateTime={lostInfo.createddate!} />
          </div>
        </div>
        <div className={styles.animalPhoto}>
          {lostInfo.photo.map((photo, idx) => {
            return <img className={styles.photo} src={photo.url} key={idx} />;
          })}
        </div>
        <Character animal={lostInfo} weight={true} />
      </div>
    </div>
  );
};

export default LostInfo;
