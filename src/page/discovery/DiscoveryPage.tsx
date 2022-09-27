import React, { useEffect, useState } from 'react';
import styles from './DiscoveryPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { setDiscoveryAnimals } from '../../modules/discoveryAnimals';
import { getDiscoveryAnimalInfo } from '../../apis/discoveryAnimal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Write from './write/write';
import storage from '../../service/storage';
import Range from '../../component/range/range';
import DiscoverySkeleton from './skeleton/discoverySkeleton';
import MapWrapper from '../../component/map/mapWrapper';

export type DiscoveryAnimal = {
  discoveryid: string;
  sido: string;
  sigungu: string;
  bname: string;
  location: string;
  lat?: number;
  lng?: number;
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
  lat: 0,
  lng: 0,
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
  const { sido, sigungu, bname } = useSelector(
    (state: RootState) => state.user.loggedInfo
  );
  const [addDiscoveryPop, setAddDiscoveryPop] = useState(false);
  const [range, setRange] = useState({ range: 'sigungu', address: sigungu });
  const [markers, setMarkers] = useState<Array<{ lat: number; lng: number }>>();

  const [panTo, setPanTo] = useState<{ lat: number; lng: number }>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    range.address && getDiscoveryAnimalsData();
  }, [range]);

  const getDiscoveryAnimalsData = async () => {
    setIsLoading(true);
    const discoveryAnimalInfo = await getDiscoveryAnimalInfo(
      range.range,
      range.address
    );
    dispatch(setDiscoveryAnimals(discoveryAnimalInfo));
    setMarkers(onMarkersPosition(discoveryAnimalInfo));

    setIsLoading(false);
  };

  const onMarkersPosition = (animalInfo: any) => {
    return animalInfo
      .map((info: any) => {
        return { lat: info.lat, lng: info.lng };
      })
      .filter((position: any) => {
        return position.lat !== null && position.lng !== null;
      });
  };

  const onRangeChange = (range: string) => {
    const addrByRange =
      range === 'sido' ? sido : range === 'sigungu' ? sigungu : bname;

    setRange({ range, address: addrByRange });
  };

  const onShowMarker = (lat: number | undefined, lng: number | undefined) => {
    if (lat && lng) {
      setMarkers([{ lat, lng }]);
      setPanTo({ lat, lng });
    } else {
      setMarkers([{ lat: 0, lng: 0 }]);
    }
  };

  return (
    <section className={styles.discovery_container}>
      <div className={styles.discovery_header}>
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
      <div className={styles.discovery_wrap}>
        <div className={styles.map}>
          <MapWrapper markers={markers} panToPosition={panTo} />
        </div>
        <div className={styles.discovery}>
          {!isLoading &&
            discoveryAnimal.map((animal: DiscoveryAnimal) => {
              return (
                <div
                  className={styles.animal}
                  key={animal.discoveryid}
                  onClick={() => onShowMarker(animal.lat, animal.lng)}
                >
                  <div>
                    {animal.photo === '' ? (
                      <img className={styles.photo} src='emptyPhoto.png' />
                    ) : (
                      <img className={styles.photo} src={animal.photo} />
                    )}
                    <div className={styles.info}>
                      <div>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className={styles.locationIcon}
                        />
                        <div className={styles.locationIcon}>
                          {animal.location}
                        </div>
                        <div className={styles.address}>
                          {animal.sido} &gt; {animal.sigungu} &gt;{' '}
                          {animal.bname}
                        </div>
                        <div className={styles.time}>
                          {moment(animal.createddate).format('HH시 mm분')}
                        </div>
                        <div className={styles.date}>
                          {moment(animal.createddate).format('MM월 DD일')}
                        </div>
                      </div>
                      <div className={styles.character}>
                        {animal.upkind && <div>[ {animal.upkind} ]</div>}
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
          {isLoading && <DiscoverySkeleton />}
        </div>
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
