import React from 'react';
import styles from './lostPetSkeleton.module.css';

const LostPetSkeleton = () => {
  return (
    <div className={styles.animal_wrap}>
      {new Array(3).fill(1).map((_, idx) => {
        return (
          <div key={idx}>
            <div className={styles.animal}>
              <div className={styles.info}>
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
              <div className={styles.desc}>
                <div className={styles.descText}></div>
              </div>
              <div className={styles.helpers}>
                <div className={styles.helpersInfo}>
                  <div className={styles.helper}></div>
                  <div className={styles.helper}></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LostPetSkeleton;
