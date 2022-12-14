import React, { useEffect, useState } from 'react';
import styles from './DiscoveryPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { setDiscoveryAnimals } from '../../modules/discoveryAnimals';
import { getDiscoveryAnimalInfo } from '../../apis/discoveryAnimal';
import Write from './write/write';
import storage from '../../service/storage';
import Range from '../../component/common/range/range';
import DiscoverySkeleton from './skeleton/discoverySkeleton';
import MapWrapper from '../../component/map/mapWrapper';
import EmptyMsg from '../../component/common/emptyMsg/emptyMsg';
import DateTime from '../../component/common/dateTime/dateTime';
import Character from '../../component/common/character/character';
import Address from '../../component/common/address/address';
import Location from '../../component/common/location/location';
import Button from '../../component/common/button/button';
import Icon from '../../component/common/icon/icon';
import Pagination from '../../component/pagination/pagination';

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
  const [showWritePopup, setShowWritePopup] = useState(false);
  const [range, setRange] = useState({ range: 'sigungu', address: sigungu });
  const [markers, setMarkers] = useState<Array<{ lat: number; lng: number }>>();
  const [panTo, setPanTo] = useState<{ lat: number; lng: number }>();
  //pagination
  const [limit, setLimit] = useState(3); //??????????????? ????????? ????????? ??????
  const [page, setPage] = useState(1);
  const [counts, setCounts] = useState(1);
  const [blockNum, setBlockNum] = useState(0); //??? ???????????? ????????? ????????????????????? ????????? block?????? ???????????? state

  const [isLoading, setIsLoading] = useState(true);

  //?????? ?????? ??? ?????? ????????? ?????? ????????? ????????????
  useEffect(() => {
    range.address && getDiscoveryAnimalsData();
  }, [range]);

  //????????? ????????????
  const getDiscoveryAnimalsData = async () => {
    setIsLoading(true);
    const discoveryAnimalInfo = await getDiscoveryAnimalInfo(
      range.range,
      range.address
    );
    dispatch(setDiscoveryAnimals(discoveryAnimalInfo));
    setMarkers(onMarkersPosition(discoveryAnimalInfo)); //????????? ?????? ?????????
    setCounts(discoveryAnimalInfo.length);

    setIsLoading(false);
  };

  //?????? ?????? ?????????
  const onRangeChange = (range: string) => {
    const addrByRange =
      range === 'sido' ? sido : range === 'sigungu' ? sigungu : bname;
    setRange({ range, address: addrByRange });
    setPage(1);
  };

  //?????? ????????? ???????????? ???????????? ?????? ?????? ?????????
  const onMarkersPosition = (animalInfo: Array<DiscoveryAnimal>) => {
    return animalInfo
      .map((info: DiscoveryAnimal) => ({ lat: info.lat!, lng: info.lng! }))
      .filter(
        (position: any) => position.lat !== null && position.lng !== null
      );
  };

  //????????? ?????? ??? ????????? ?????? ??????
  const onShowMarker = (lat: number | undefined, lng: number | undefined) => {
    if (lat && lng) {
      setMarkers([{ lat, lng }]);
      setPanTo({ lat, lng }); //?????? ????????? ?????? ??????
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
        <Button
          msg='?????????'
          onClick={() => {
            setShowWritePopup(true);
          }}
        />
      </div>
      <p className={styles.explanation}>
        <span className={styles.locationIcon}>
          <Icon icon='LocationDot' />
        </span>
        ???????????? ?????? ???????????? ????????? ??????????????????.
      </p>
      <div className={styles.discovery_wrap}>
        <div className={styles.map}>
          <MapWrapper markers={markers} panToPosition={panTo} />
        </div>
        <div className={styles.discovery}>
          {discoveryAnimal?.length === 0 && !isLoading && <EmptyMsg />}
          {isLoading ? (
            <DiscoverySkeleton />
          ) : (
            discoveryAnimal
              .slice((page - 1) * limit, page * limit)
              .map((animal: DiscoveryAnimal) => {
                return (
                  <div
                    className={styles.animal}
                    key={animal.discoveryid}
                    onClick={() => onShowMarker(animal.lat, animal.lng)}
                  >
                    <div>
                      <img
                        className={styles.photo}
                        src={
                          animal.photo === '' ? 'emptyPhoto.png' : animal.photo
                        }
                      />
                      <div className={styles.info}>
                        <div className={styles.lostInfo}>
                          <div className={styles.location}>
                            <Location
                              location={animal.location}
                              marker={animal.lat ? true : false}
                            />
                          </div>
                          <div className={styles.address}>
                            <Address address={animal} />
                          </div>
                          <DateTime dateTime={animal.createddate} />
                        </div>
                        <Character animal={animal} />
                      </div>
                    </div>
                    <div className={styles.desc}>{animal.desc}</div>
                  </div>
                );
              })
          )}
        </div>
      </div>
      <Pagination
        limit={limit}
        page={page}
        setPage={setPage}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        counts={counts}
      />
      {showWritePopup && (
        <Write
          setShowWritePopup={setShowWritePopup}
          getDiscoveryAnimalsData={getDiscoveryAnimalsData}
        />
      )}
    </section>
  );
};

export default DiscoveryPage;
