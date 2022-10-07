import React, { useEffect, useRef, useState } from 'react';
import styles from './discovery.module.css';
import {
  DiscoveryAnimal,
  initDiscoveryData,
} from '../../page/discovery/DiscoveryPage';
import { getDiscoveryAnimalInfo } from '../../apis/discoveryAnimal';
import DiscoverySkeleton from './skeleton/discoverySkeleton';
import DateTime from '../common/dateTime/dateTime';
import Location from '../common/location/location';
import Character from '../common/character/character';
import Title from '../common/title/title';

const Discovery = () => {
  const [count, setCount] = useState(0);
  const [discovery, setDiscovery] = useState<Array<DiscoveryAnimal>>([
    initDiscoveryData,
  ]);

  console.log(discovery);

  const [isLoading, setIsLoading] = useState(true);

  const interval = useRef<NodeJS.Timer>();
  useEffect(() => {
    setIsLoading(true);
    const discoveryAnimalInfo = async () => {
      const result = await getDiscoveryAnimalInfo('all', '');
      setDiscovery(result);
      setIsLoading(false);
    };
    discoveryAnimalInfo();
  }, []);

  //5초에 한번 화면 전환
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
        <Title
          title='우리동네 반려동물 발견'
          subTitle='우리 동네에 돌아다니는 동물 정보입니다. 주인이거나 주인을 아는 분들은
          연락주세요.'
          page='discovery'
        />
        {isLoading ? (
          <div className={styles.info}>
            <DiscoverySkeleton />
          </div>
        ) : discovery.length === 0 ? (
          <div className={`${styles.info} ${styles.emptyMsg}`}>
            게시글이 존재하지 않습니다.
          </div>
        ) : (
          <div className={styles.info}>
            <img
              className={styles.photo}
              src={
                discovery[count]?.photo
                  ? discovery[count]?.photo
                  : 'emptyPhoto.png'
              }
            />
            <div className={styles.location}>
              <Location location={discovery[count]?.location} />
            </div>
            <div className={styles.dateTime}>
              <DateTime dateTime={discovery[count]?.createddate} />
            </div>
            <div className={styles.character}>
              <Character animal={discovery[count]} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Discovery;
