import React from 'react';
import styles from './dateTime.module.css';
import moment from 'moment';
import Icon from '../icon/icon';

const DateTime = ({ dateTime }: { dateTime: string }) => {
  return (
    <div className={styles.datetime}>
      <div className={styles.date}>{moment(dateTime).format('MM월 DD일')}</div>
      <div className={styles.time}>
        <span className={styles.clockIcon}>
          <Icon icon='Clock' />
        </span>
        {moment(dateTime).format('HH시 mm분')}
      </div>
    </div>
  );
};

export default DateTime;
