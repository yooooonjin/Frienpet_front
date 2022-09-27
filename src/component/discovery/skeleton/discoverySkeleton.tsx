import React from 'react';
import styles from './discoverySkeleton.module.css';

const DiscoverySkeleton = () => {
  return (
    <>
      <div className={styles.photo}></div>
      <p className={styles.location}></p>
      <span className={styles.feature}></span>
    </>
  );
};

export default DiscoverySkeleton;
