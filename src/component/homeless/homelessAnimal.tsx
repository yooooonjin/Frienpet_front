import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import styles from './homelessAnimal.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomelessAnimalT } from './homeless';
import DateFormat from '../common/dateFormat/dateFormat';
import Icon from '../common/icon/icon';

export interface AnimalProps {
  animal: HomelessAnimalT;
  setSelectedAnimal: Dispatch<SetStateAction<HomelessAnimalT | undefined>>;
}

const HomelessAnimal: FunctionComponent<AnimalProps> = ({
  animal,
  setSelectedAnimal,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={styles.info}
      onClick={() => {
        if (location.pathname === '/homeless') {
          //동물 목록에서 선택시 최상단으로 이동
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setSelectedAnimal(animal);
        } else {
          navigate('/homeless', { state: { animal } });
        }
      }}
    >
      <img className={styles.info_img} src={animal.popfile} />
      <div className={styles.info_text}>
        <div
          className={`${styles.gender} ${
            animal.sexCd === 'F'
              ? styles.female
              : animal.sexCd === 'M'
              ? styles.male
              : styles.unknown
          }`}
        >
          {animal.sexCd}
        </div>
        <div className={styles.featureAndLocation}>
          <ul className={styles.feature}>
            <li>{animal.age}</li>
            <li>
              {animal.kindCd} | {animal.weight}
            </li>
          </ul>
          <p className={styles.location}>
            <span className={styles.locationIcon}>
              <Icon icon='LocationDot' />
            </span>
            {animal.happenPlace}
          </p>
        </div>
        <div className={styles.period}>
          <DateFormat date={animal.noticeSdt} division='.' />
          <br />~
          <DateFormat date={animal.noticeEdt} division='.' />
        </div>
      </div>
    </div>
  );
};

export default HomelessAnimal;
