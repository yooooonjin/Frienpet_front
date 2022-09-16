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

export type DiscoveryAnimal = {
  discoveryid: string;
  upr_cd: string;
  org_cd: string;
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
  upr_cd: storage.get('loggedInfo')?.upr_cd,
  org_cd: storage.get('loggedInfo')?.org_cd,
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

  const [addDiscoveryPop, setAddDiscoveryPop] = useState(false);

  useEffect(() => {
    getDiscoveryAnimalsData();
  }, []);

  const getDiscoveryAnimalsData = async () => {
    const discoveryAnimalInfo = await getDiscoveryAnimalInfo();
    dispatch(setDiscoveryAnimals(discoveryAnimalInfo));
  };

  return (
    <section className={styles.discovery_container}>
      <div className={styles.discovery}>
        <div
          className={styles.write}
          onClick={() => {
            setAddDiscoveryPop(true);
          }}
        >
          글쓰기
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
