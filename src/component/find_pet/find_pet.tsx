import React from 'react';
import styles from './find_pet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const FindPet = () => {
  return (
    <section className={styles.findPet_container}>
      <div className={styles.findPet}>
        <h2 className={styles.title}>함께 우리동네 반려동물 찾기</h2>
        <p className={styles.subTitle}>
          우리동네 잃어버린 반려동물입니다. 집에 무사히 도착할 수 있도록
          도와주세요.
        </p>
        <div className={styles.info_container}>
          <div className={styles.info}>
            <div className={styles.info_img}>
              <img src='images/frienpet(1).jpg' alt='' />
            </div>
            <div className={styles.info_text}>
              <p className={styles.date}>8월 30일</p>
              <p className={styles.time}>PM 11시 30분</p>
              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                방학 3동 우성2차 아파트
              </p>
              <p className={styles.feature}>
                귀가 크고 털은 갈색입니다. 사람을 좋아하며 간식을 가지고 부르면
                한번에 달려옵니다. 잠시 문을 열어놓은 사이에 나간 것 같습니다..
              </p>
            </div>
          </div>
          {/* //////////////////////////////////// */}
          <div className={styles.info}>
            <div className={styles.info_img}>
              <img src='images/frienpet(2).jpg' alt='' />
            </div>
            <div className={styles.info_text}>
              <p className={styles.date}>8월 30일</p>
              <p className={styles.time}>PM 11시 30분</p>
              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                방학 3동 우성2차 아파트
              </p>
              <p className={styles.feature}>
                귀가 크고 털은 갈색입니다. 사람을 좋아하며 간식을 가지고 부르면
                한번에 달려옵니다. 잠시 문을 열어놓은 사이에 나간 것 같습니다..
              </p>
            </div>
          </div>
          {/* //////////////////////////////////// */}
          <div className={styles.info}>
            <div className={styles.info_img}>
              <img src='images/frienpet(3).jpg' alt='' />
            </div>
            <div className={styles.info_text}>
              <p className={styles.date}>8월 30일</p>
              <p className={styles.time}>PM 11시 30분</p>
              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                방학 3동 우성2차 아파트
              </p>
              <p className={styles.feature}>
                귀가 크고 털은 갈색입니다. 사람을 좋아하며 간식을 가지고 부르면
                한번에 달려옵니다. 잠시 문을 열어놓은 사이에 나간 것 같습니다..
              </p>
            </div>
          </div>
          {/* //////////////////////////////////// */}
          <div className={styles.info}>
            <div className={styles.info_img}>
              <img src='images/frienpet(4).jpg' alt='' />
            </div>
            <div className={styles.info_text}>
              <p className={styles.date}>8월 30일</p>
              <p className={styles.time}>PM 11시 30분</p>
              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                방학 3동 우성2차 아파트
              </p>
              <p className={styles.feature}>
                귀가 크고 털은 갈색입니다. 사람을 좋아하며 간식을 가지고 부르면
                한번에 달려옵니다. 잠시 문을 열어놓은 사이에 나간 것 같습니다..
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindPet;
