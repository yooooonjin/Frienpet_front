import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import styles from './homeless.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDog,
  faCat,
  faCircleExclamation,
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
} from '@fortawesome/free-solid-svg-icons';
import Sido from './sido';
import SiGunGu from './sigungu';
import { getAbandonmentPublic } from '../../util/abandoned_animal_api';
import Animals from './animals';
import { HomelessProps } from '../../page/homeless_page/homeless_page';
import { Dispatch } from 'react';
import { useLocation } from 'react-router-dom';

export interface SidoProps {
  onSidoChange(sido: string): void;
  onFilterChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void;
}
export interface SiGunGuProps {
  selectedSido: string;
  onFilterChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void;
  onReset(): void;
}
export interface AnimalProps {
  animal: Animals;
  setSelectedAnimal: Dispatch<SetStateAction<Animals | undefined>>;
}

export type AnimalsFilter = {
  bgnde: string;
  endde: string;
  upkind: string;
  upr_cd: string;
  org_cd: string;
  state: string;
  pageNo: number;
  numOfRows: number;
};

export type Animals = {
  age: string;
  careAddr: string;
  careNm: string;
  careTel: string;
  chargeNm: string;
  colorCd: string;
  desertionNo: string;
  filename: string;
  happenDt: string;
  happenPlace: string;
  kindCd: string;
  neuterYn: string;
  noticeEdt: string;
  noticeNo: string;
  noticeSdt: string;
  officetel: string;
  orgNm: string;
  popfile: string;
  processState: string;
  sexCd: string;
  specialMark: string;
  weight: string;
};

const PER_PAGE: number = 5;

const Homeless: React.FunctionComponent<HomelessProps> = ({
  setSelectedAnimal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSido, setSelectedSido] = useState<string>('');
  const [animals, setAnimals] = useState<Array<Animals>>([]);
  const [animalsFilter, setAnimalsFilter] = useState<AnimalsFilter>({
    bgnde: moment(Date.now()).subtract(1, 'months').format('YYYY-MM-DD'),
    endde: moment(Date.now()).format('YYYY-MM-DD'),
    upkind: '417000',
    upr_cd: '',
    org_cd: '',
    state: '',
    pageNo: 1,
    numOfRows: PER_PAGE,
  });
  // console.log(animalsFilter);

  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    animalDataRequest(animalsFilter);
  }, []);

  const onPageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    let newAnimalsFilter: AnimalsFilter;
    if (id === 'next') {
      if (animalsFilter.pageNo === totalCount) return;
      newAnimalsFilter = {
        ...animalsFilter,
        pageNo: animalsFilter.pageNo + 1,
      };
    } else if (id === 'pre') {
      if (animalsFilter.pageNo === 1) return;
      newAnimalsFilter = {
        ...animalsFilter,
        pageNo: animalsFilter.pageNo - 1,
      };
    }
    setAnimalsFilter(newAnimalsFilter!);
    animalDataRequest(newAnimalsFilter!);
  };

  const onSidoChange = (sido: string) => {
    setSelectedSido(sido);
  };

  const onFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAnimalsFilter((animalsFilter) => {
      return { ...animalsFilter, [name]: value };
    });
  };
  const onSigunguReset = () => {
    setAnimalsFilter((animalsFilter) => {
      return { ...animalsFilter, org_cd: '' };
    });
  };

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newAnimalsFilter: AnimalsFilter = { ...animalsFilter, pageNo: 1 };

    setAnimalsFilter(newAnimalsFilter);
    animalDataRequest(newAnimalsFilter);
  };

  const animalDataRequest = (animalsFilter: AnimalsFilter) => {
    setLoading(true);
    const newBgnde = animalsFilter.bgnde.replace(/-/g, '');
    const newEndde = animalsFilter.endde.replace(/-/g, '');
    const newAnimalsFilter = {
      ...animalsFilter,
      bgnde: newBgnde,
      endde: newEndde,
    };

    console.log('animalDataRequest', newAnimalsFilter);
    getAbandonmentPublic(newAnimalsFilter)
      .then((data: any) => {
        setAnimals(data.data.response.body.items.item);
        setTotalCount(Math.ceil(data.data.response.body.totalCount / PER_PAGE));
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <section className={styles.homeless_container}>
      {loading && (
        <div className={styles.loading_container}>
          <div className={styles.loader}></div>
        </div>
      )}
      <div className={styles.homeless}>
        <h2 className={styles.title}>보호중인 유기동물</h2>
        <p className={styles.subTitle}>
          본 정보는 지방자치단체와 유기동물 보호시설에서 등록한 보호중
          동물입니다.
        </p>
        <form className={styles.search_bar}>
          <input
            className={styles.radio}
            type='radio'
            name='upkind'
            id='dog'
            value='417000'
            onChange={onFilterChange}
            defaultChecked
          />
          <label htmlFor='dog' className={styles.animal}>
            <FontAwesomeIcon icon={faDog} className={styles.animalIcon} />
          </label>
          <input
            className={styles.radio}
            type='radio'
            name='upkind'
            id='cat'
            value='422400'
            onChange={onFilterChange}
          />
          <label htmlFor='cat' className={styles.animal}>
            <FontAwesomeIcon icon={faCat} className={styles.animalIcon} />
          </label>
          <div className={styles.upr_cd}>
            <span>지역 : </span>
            <Sido onSidoChange={onSidoChange} onFilterChange={onFilterChange} />
          </div>
          <div className={styles.org_cd}>
            <span>세부 지역 : </span>
            <SiGunGu
              selectedSido={selectedSido}
              onFilterChange={onFilterChange}
              onReset={onSigunguReset}
            />
          </div>
          <div className={styles.date}>
            <span>날짜 : </span>
            <input
              type='date'
              value={animalsFilter.bgnde}
              name='bgnde'
              onChange={onFilterChange}
            />
            <span>~</span>
            <input
              type='date'
              value={animalsFilter.endde}
              name='endde'
              onChange={onFilterChange}
            />
          </div>
          <button onClick={onSearch}>찾아보기</button>
        </form>
        <div className={styles.info_container}>
          {animals &&
            animals.map((data: Animals): ReactNode => {
              return (
                <Animals
                  key={data.desertionNo}
                  animal={data}
                  setSelectedAnimal={setSelectedAnimal}
                />
              );
            })}
          {!animals && (
            <div>
              <FontAwesomeIcon icon={faCircleExclamation} /> 해당하는 유기동물이
              존재하지 않습니다.
            </div>
          )}
        </div>
        <div className={styles.pagination}>
          <div className={styles.arrow} id='pre' onClick={onPageChange}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <p className={styles.pageNumber}>
            <span>{animalsFilter.pageNo}</span> / {totalCount}
          </p>
          <div className={styles.arrow} id='next' onClick={onPageChange}>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homeless;
