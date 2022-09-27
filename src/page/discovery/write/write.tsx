import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './write.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { saveDiscoveryAnimalInfo } from '../../../apis/discoveryAnimal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { DiscoveryAnimal, initDiscoveryData } from '../DiscoveryPage';
import useInput from '../../../hooks/useInput';
import MapWrapper from '../../../component/map/mapWrapper';

interface WriteProps {
  setAddDiscoveryPop: React.Dispatch<SetStateAction<boolean>>;
  getDiscoveryAnimalsData(): void;
}

const Write: React.FunctionComponent<WriteProps> = ({
  setAddDiscoveryPop,
  getDiscoveryAnimalsData,
}) => {
  const [form, onChange, reset] = useInput<DiscoveryAnimal>(initDiscoveryData);
  const locationRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [marker, setMarker] = useState<Array<{ lat: number; lng: number }>>();

  const userInfo = useSelector((state: RootState) => state.user.loggedInfo);

  useEffect(() => {
    reset();
    formRef.current?.reset();
  }, []);

  const onSetMarker = (lat: number, lng: number) => {
    setMarker([{ lat, lng }]);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (form.location == '') {
      locationRef.current?.focus();
      return;
    }
    const discoveryMarker = marker && marker[0];
    await saveDiscoveryAnimalInfo({
      ...form,
      ...discoveryMarker,
      email: userInfo.email,
    });
    setAddDiscoveryPop(false);
    getDiscoveryAnimalsData();
  };

  return (
    <section>
      <div className={styles.dim}></div>
      <form ref={formRef} className={styles.write_popup}>
        <div className={styles.close} onClick={() => setAddDiscoveryPop(false)}>
          <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} />
        </div>
        <div className={`${styles.location} ${styles.address}`}>
          <p>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.locationIcon}
            />
          </p>
          <input
            type='text'
            readOnly
            value={`${form.sido} ${form.sigungu} ${form.bname}`}
          />

          {/* <Sido onSidoChange={onChange} userSido={userInfo.upr_cd} />
            <SiGunGu
              selectedSido={userInfo.upr_cd}
              onFilterChange={onChange}
              userSiGunGu={userInfo.org_cd}
            /> */}
        </div>
        <div className={styles.location}>
          <p>*상세위치:</p>
          <input
            ref={locationRef}
            type='text'
            name='location'
            onChange={onChange}
          />
        </div>
        <div className={styles.map}>
          <MapWrapper markers={marker} onSetMarker={onSetMarker} />
        </div>
        <div className={styles.character}>
          <div className={styles.row}>
            <div>
              <p>축종 : </p>
              <select name='upkind' id='upkind' onChange={onChange}>
                <option value='기타'>기타</option>
                <option value='개'>개</option>
                <option value='고양이'>고양이</option>
              </select>
            </div>
            <div>
              <p>품종 : </p>
              <input type='text' name='kind' onChange={onChange} />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <p>크기 : </p>
              <select name='size' id='size' onChange={onChange}>
                <option value=''>선택</option>
                <option value='소형'>소형</option>
                <option value='중형'>중형</option>
                <option value='대형'>대형</option>
              </select>
            </div>
            <div>
              <p>색깔 : </p>
              <input type='text' name='color' onChange={onChange} />
            </div>
            <div>
              <p>성별 : </p>
              <select name='gender' id='gender' onChange={onChange}>
                <option value=''>미상</option>
                <option value='F'>암컷</option>
                <option value='M'>수컷</option>
              </select>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.desc}>
            <p>상세 설명</p>
            <textarea name='desc' onChange={onChange}></textarea>
          </div>
          <div className={styles.line}></div>
        </div>
        <input type='file' name='photo' onChange={onChange} />
        <button className={styles.button} onClick={onSubmit}>
          발견 동물 입력
        </button>
      </form>
    </section>
  );
};

export default Write;
