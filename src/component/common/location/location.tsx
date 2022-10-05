import React from 'react';
import styles from './location.module.css';
import Icon from '../icon/icon';

const Location = ({
  location,
  marker,
}: {
  location: string;
  marker?: boolean;
}) => {
  return (
    <div className={styles.location_wrap}>
      <p className={`${styles.locationIcon} ${marker && styles.pink}`}>
        <Icon icon='LocationDot' />
      </p>
      <div className={styles.location}>{location}</div>
    </div>
  );
};

export default Location;
