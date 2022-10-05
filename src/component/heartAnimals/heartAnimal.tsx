import React from 'react';
import styles from './heartAnimal.module.css';
import { HeartAnimal } from '../../apis/homeless';
import moment from 'moment';
import Icon from '../common/icon/icon';

const Heart = ({
  animal,
  today,
  onOpenInfo,
}: {
  animal: HeartAnimal;
  today: moment.Moment;
  onOpenInfo(animal: HeartAnimal, beOver: boolean, end: boolean): void;
}) => {
  const endDate = moment(animal.noticeEdt);
  const period = today.diff(endDate, 'days');
  const beOver = period <= 0 && period >= -2; //종료 3일 전 공모
  const end = period > 0; //기간이 지난 공모

  return (
    <div
      className={`${styles.heartAnimal} ${end && styles.end}`}
      onClick={() => onOpenInfo(animal, beOver, end)}
    >
      <img
        src={animal?.filename}
        className={`${styles.photo} ${beOver && styles.beOver}`}
      />
      {beOver && (
        <p className={styles.beOverIcon}>
          <Icon icon='Exclamation' />
        </p>
      )}
    </div>
  );
};

export default Heart;
