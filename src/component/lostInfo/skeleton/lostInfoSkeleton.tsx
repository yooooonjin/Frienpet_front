import React from 'react';
import styles from './lostInfoSkeleton.module.css';

const LostInfoSkeleton = () => {
  return (
    <div className={styles.info_container}>
      {new Array(3).fill(1).map((_, idx) => {
        return (
          <div className={styles.info} key={idx}>
            <div className={styles.lostInfo}>
              <div className={styles.location}></div>
              <div className={styles.basicLostInfo}>
                <div className={styles.address}></div>
                <div className={styles.datetime}></div>
              </div>
            </div>
            <div className={styles.animalPhoto}>
              <div className={styles.photo} />
              <div className={styles.photo} />
              <div className={styles.photo} />
            </div>
            <div className={styles.character}></div>
          </div>
        );
      })}
    </div>
  );
};

export default LostInfoSkeleton;
