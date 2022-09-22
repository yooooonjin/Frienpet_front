import React from 'react';
import styles from './discoverySkeleton.module.css';

const DiscoverySkeleton = () => {
  return (
    <div className={styles.discovery}>
      {new Array(3).fill(1).map((_, idx) => {
        return (
          <div className={styles.animal} key={idx}>
            <div>
              <div className={styles.photo} />
              <div className={styles.info}>
                <div className={styles.location}>
                  <div className={styles.locationText}></div>
                  <div className={styles.datetime}></div>
                </div>
                <div className={styles.character}></div>
              </div>
            </div>
            <div className={styles.desc}></div>
          </div>
        );
      })}
    </div>
  );
};

export default DiscoverySkeleton;
