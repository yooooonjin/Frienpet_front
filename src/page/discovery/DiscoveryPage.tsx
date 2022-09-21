import React, { useEffect, useState } from 'react';
import styles from './DiscoveryPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { setDiscoveryAnimals } from '../../modules/discoveryAnimals';
import { getDiscoveryAnimalInfo } from '../../apis/discoveryAnimal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Write from '../../component/discovery/write/write';
import storage from '../../service/storage';
import Range from '../../component/range/range';

export type DiscoveryAnimal = {
  discoveryid: string;
  sido: string;
  sigungu: string;
  bname: string;
  location: string;
  upkind: string;
  kind: string;
  size: string;
  color: string;
  gender: string;
  desc: string;
  photo: string;
  createddate: string;
};
export const initDiscoveryData = {
  discoveryid: '',
  sido: storage.get('loggedInfo')?.sido,
  sigungu: storage.get('loggedInfo')?.sigungu,
  bname: storage.get('loggedInfo')?.bname,
  location: '',
  upkind: '',
  kind: '',
  size: '',
  color: '',
  gender: '',
  desc: '',
  photo: '',
  createddate: '',
};

const DiscoveryPage = () => {
  const dispatch = useDispatch();
  const discoveryAnimal = useSelector(
    (state: RootState) => state.discoveryAnimals
  );
  const { email, name, phone, sido, sigungu, bname } = useSelector(
    (state: RootState) => state.user.loggedInfo
  );

  const [addDiscoveryPop, setAddDiscoveryPop] = useState(false);
  const [range, setRange] = useState({ range: 'sigungu', address: sigungu });

  console.log(discoveryAnimal);

  useEffect(() => {
    range.address && getDiscoveryAnimalsData();
  }, [range]);

  const getDiscoveryAnimalsData = async () => {
    const discoveryAnimalInfo = await getDiscoveryAnimalInfo(
      range.range,
      range.address
    );
    dispatch(setDiscoveryAnimals(discoveryAnimalInfo));
  };

  const onRangeChange = (range: string) => {
    const addrByRange =
      range === 'sido' ? sido : range === 'sigungu' ? sigungu : bname;

    setRange({ range, address: addrByRange });
  };

  return (
    <section className={styles.discovery_container}>
      <div className={styles.discovery}>
        <div>
          <div>
            <Range onRangeChange={onRangeChange} />
          </div>
          <div
            className={styles.write}
            onClick={() => {
              setAddDiscoveryPop(true);
            }}
          >
            글쓰기
          </div>
        </div>
        {discoveryAnimal.map((animal) => {
          return (
            <div className={styles.animal} key={animal.discoveryid}>
              <div>
                <img className={styles.photo} src={animal.photo} alt='' />
                <div className={styles.info}>
                  <div>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className={styles.locationIcon}
                    />
                    <div className={styles.locationIcon}>{animal.location}</div>
                    <div className={styles.address}>
                      {animal.sido} &gt; {animal.sigungu} &gt; {animal.bname}
                    </div>
                    <div className={styles.time}>
                      {moment(animal.createddate).format('HH시 mm분')}
                    </div>
                    <div className={styles.date}>
                      {moment(animal.createddate).format('MM월 DD일')}
                    </div>
                  </div>
                  <div className={styles.character}>
                    <div>[ {animal.upkind} ]</div>
                    {animal.kind && <div>{animal.kind}</div>}
                    {animal.color && <div>{animal.color}</div>}
                    {animal.size && <div>{animal.size}</div>}
                    {animal.gender && (
                      <div>{animal.gender === 'F' ? '암컷' : '수컷'}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.desc}>{animal.desc}</div>
            </div>
          );
        })}
      </div>
      {addDiscoveryPop && (
        <Write
          setAddDiscoveryPop={setAddDiscoveryPop}
          getDiscoveryAnimalsData={getDiscoveryAnimalsData}
        />
      )}
    </section>
  );
};

export default DiscoveryPage;
