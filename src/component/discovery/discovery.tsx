import React, { useEffect, useRef, useState } from 'react';
import styles from './discovery.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
  DiscoveryAnimal,
  initDiscoveryData,
} from '../../page/discovery/DiscoveryPage';
import moment from 'moment';
import { getDiscoveryAnimalInfo } from '../../apis/discoveryAnimal';
import { useNavigate } from 'react-router-dom';

const Discovery = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [discovery, setDiscovery] = useState<Array<DiscoveryAnimal>>([
    initDiscoveryData,
  ]);
  const interval = useRef<NodeJS.Timer>();
  useEffect(() => {
    const discoveryAnimalInfo = async () => {
      const result = await getDiscoveryAnimalInfo();
      console.log(result);

      setDiscovery(result);
    };
    discoveryAnimalInfo();
  }, []);

  useEffect(() => {
    interval.current = setInterval(discoveryChange, 5000);
    return () => {
      clearInterval(interval.current);
    };
  });

  const discoveryChange = () => {
    if (discovery.length - 1 === count) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };
  return (
    <section className={styles.discovery_container}>
      <div className={styles.discovery}>
        <h2
          className={styles.title}
          onClick={() => {
            navigate('/discovery');
          }}
        >
          우리동네 반려동물 발견<span className={styles.more}>▶</span>
        </h2>

        <p className={styles.subTitle}>
          우리 동네에 돌아다니는 동물 정보입니다. 주인이거나 주인을 아는 분들은
          연락주세요.
        </p>
        <div className={styles.info}>
          <img className={styles.photo} src={discovery[count].photo} alt='' />
          <p className={styles.location}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.locationIcon}
            />
            {discovery[count]?.location}
          </p>
          <p className={styles.date}>
            {moment(discovery[count]?.createddate).format('MM월 DD일')}
          </p>
          <p className={styles.time}>
            {moment(discovery[count]?.createddate).format('HH시 mm분')}
          </p>
          <span className={styles.feature}>
            [ {discovery[count]?.upkind} ] {discovery[count]?.kind}{' '}
            {discovery[count]?.size} {discovery[count]?.color}{' '}
            {discovery[count]?.gender === 'F'
              ? '암컷'
              : discovery[count]?.gender === 'M'
              ? '수컷'
              : ''}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Discovery;
