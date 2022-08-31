import React from 'react';
import styles from './discovery.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Discovery = () => {
  return (
    <section className={styles.discovery_container}>
      <div className={styles.discovery}>
        <h2 className={styles.title}>우리동네 반려동물 발견</h2>
        <p className={styles.subTitle}>
          우리 동네에 돌아다니는 동물 정보입니다. 주인이거나 주인을 아는 분들은
          연락주세요.
        </p>
        <div className={styles.info}>
          <p className={styles.location}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.locationIcon}
            />
            방학 3동 우성2차 아파트 101동 앞 놀이터
          </p>
          <p className={styles.time}>PM 11시 30분</p>
          <span className={styles.feature}>15키로 정도 되는 검정 믹스견</span>
        </div>
      </div>
    </section>
  );
};

export default Discovery;
