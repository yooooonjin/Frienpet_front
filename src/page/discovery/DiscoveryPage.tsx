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
  const [limit, setLimit] = useState(3); //한페이지에 보여줄 데이터 개수
  const [page, setPage] = useState(1);
  const [counts, setCounts] = useState(1);
  const [blockNum, setBlockNum] = useState(0); //한 페이지에 보여줄 페이지네이션의 개수를 block으로 지정하는 state

  const [isLoading, setIsLoading] = useState(true);

  //범위 선택 시 지정 범위에 맞는 데이터 불러오기
  useEffect(() => {
    range.address && getDiscoveryAnimalsData();
  }, [range]);

  //데이터 불러오기
  const getDiscoveryAnimalsData = async () => {
    setIsLoading(true);
    const discoveryAnimalInfo = await getDiscoveryAnimalInfo(
      range.range,
      range.address
    );
    dispatch(setDiscoveryAnimals(discoveryAnimalInfo));
    setMarkers(onMarkersPosition(discoveryAnimalInfo)); //지도에 마커 띄우기
    setCounts(discoveryAnimalInfo.length);

    setIsLoading(false);
  };

  //지정 범위 바꾸기
  const onRangeChange = (range: string) => {
    const addrByRange =
      range === 'sido' ? sido : range === 'sigungu' ? sigungu : bname;
    setRange({ range, address: addrByRange });
    setPage(1);
  };

  //위도 경도가 존재하는 게시글만 추려 마커 띄우기
  const onMarkersPosition = (animalInfo: Array<DiscoveryAnimal>) => {
    return animalInfo
      .map((info: DiscoveryAnimal) => ({ lat: info.lat!, lng: info.lng! }))
      .filter(
        (position: any) => position.lat !== null && position.lng !== null
      );
  };

  //게시글 클릭 시 지도에 마커 표시
  const onShowMarker = (lat: number | undefined, lng: number | undefined) => {
    if (lat && lng) {
      setMarkers([{ lat, lng }]);
      setPanTo({ lat, lng }); //지정 위치로 센터 이동
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
          msg='글쓰기'
          onClick={() => {
            setShowWritePopup(true);
          }}
        />
      </div>
      <p className={styles.explanation}>
        <span className={styles.locationIcon}>
          <Icon icon='LocationDot' />
        </span>
        게시글을 눌러 지도에서 위치를 확인해주세요.
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
