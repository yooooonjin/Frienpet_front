import React, { useEffect, useState } from 'react';
import styles from './homeless.module.css';
import moment from 'moment';
import Sido from './sido';
import SiGunGu from './sigungu';
import { getAbandonmentPublic } from '../../service/abandoned_animal_api';
import { HomelessProps } from '../../page/homeless/HomelessPage';
import Title from '../title/title';
import HomelessAnimal from './homelessAnimal';
import Icon from '../icon/icon';

export type HomelessAnimalsFilterT = {
  bgnde: string;
  endde: string;
  upkind: string;
  upr_cd: string;
  org_cd: string;
  state: string;
  pageNo: number;
  numOfRows: number;
};

export type HomelessAnimalT = {
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

const initFilter = {
  bgnde: moment(Date.now()).subtract(1, 'months').format('YYYY-MM-DD'),
  endde: moment(Date.now()).format('YYYY-MM-DD'),
  upkind: '417000',
  upr_cd: '',
  org_cd: '',
  state: '',
  pageNo: 1,
  numOfRows: PER_PAGE,
};

const Homeless: React.FunctionComponent<HomelessProps> = ({
  setSelectedAnimal,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [animalsFilter, setAnimalsFilter] =
    useState<HomelessAnimalsFilterT>(initFilter);
  const [selectedSido, setSelectedSido] = useState<string>('');
  const [animals, setAnimals] = useState<Array<HomelessAnimalT>>([]);

  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    animalDataRequest(animalsFilter);
  }, []);

  //페이지 변경
  const onPageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    let newAnimalsFilter: HomelessAnimalsFilterT;
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

  //시도 변경
  const onSidoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSido(e.target.value);
    onFilterChange(e);
  };

  //검색 필터 변경
  const onFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAnimalsFilter((animalsFilter) => {
      return { ...animalsFilter, [name]: value };
    });
  };

  //시도 변경시 시군구 리셋
  const onSigunguReset = () => {
    setAnimalsFilter((animalsFilter) => {
      return { ...animalsFilter, org_cd: '' };
    });
  };

  //찾아보기 버튼 클릭 시
  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newAnimalsFilter: HomelessAnimalsFilterT = {
      ...animalsFilter,
      pageNo: 1,
    };

    setAnimalsFilter(newAnimalsFilter);
    animalDataRequest(newAnimalsFilter);
  };

  //유기동물 정보 불러오기
  const animalDataRequest = (animalsFilter: HomelessAnimalsFilterT) => {
    setIsLoading(true);
    const newBgnde = animalsFilter.bgnde.replace(/-/g, '');
    const newEndde = animalsFilter.endde.replace(/-/g, '');
    const newAnimalsFilter = {
      ...animalsFilter,
      bgnde: newBgnde,
      endde: newEndde,
    };

    getAbandonmentPublic(newAnimalsFilter)
      .then((data: any) => {
        if (data.data.response) {
          setAnimals(data.data.response.body.items.item);
          setTotalCount(
            Math.ceil(data.data.response.body.totalCount / PER_PAGE)
          );
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={styles.homeless_container}>
      {isLoading && (
        <div className={styles.loading_container}>
          <div className={styles.loader}></div>
        </div>
      )}
      <div className={styles.homeless}>
        <Title
          title='보호중인 유기동물'
          subTitle='본 정보는 지방자치단체와 유기동물 보호시설에서 등록한 보호중
          동물입니다.'
          page='homeless'
        />
        <form className={styles.search_bar}>
          <div className={styles.upkind}>
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
              <p className={styles.animalIcon}>
                <Icon icon='Dog' />
              </p>
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
              <p className={styles.animalIcon}>
                <Icon icon='Cat' />
              </p>
            </label>
          </div>
          <div className={styles.filter_wrap}>
            <div className={styles.region}>
              <div className={styles.upr_cd}>
                <span>지역 : </span>
                <Sido onSidoChange={onSidoChange} />
              </div>
              <div className={styles.org_cd}>
                <span>세부 지역 : </span>
                <SiGunGu
                  selectedSido={selectedSido}
                  onFilterChange={onFilterChange}
                  onReset={onSigunguReset}
                />
              </div>
            </div>
            <div className={styles.date}>
              <span>날짜 : </span>
              <div className={styles.dateFomat}>
                <input
                  type='date'
                  value={animalsFilter.bgnde}
                  name='bgnde'
                  onChange={onFilterChange}
                />
                <input
                  type='date'
                  value={animalsFilter.endde}
                  name='endde'
                  onChange={onFilterChange}
                />
              </div>
            </div>
          </div>
          <button onClick={onSearch}>찾아보기</button>
        </form>
        <div className={styles.info_container}>
          {animals ? (
            animals.map((animal: HomelessAnimalT) => {
              return (
                <HomelessAnimal
                  key={animal.desertionNo}
                  animal={animal}
                  setSelectedAnimal={setSelectedAnimal}
                />
              );
            })
          ) : (
            <div>
              <Icon icon='Exclamation' /> 해당하는 유기동물이 존재하지 않습니다.
            </div>
          )}
        </div>
        <div className={styles.pagination}>
          <div className={styles.arrow} id='pre' onClick={onPageChange}>
            <Icon icon='Left' />
          </div>
          <p className={styles.pageNumber}>
            <span>{animalsFilter.pageNo}</span> / {totalCount}
          </p>
          <div className={styles.arrow} id='next' onClick={onPageChange}>
            <Icon icon='Right' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homeless;
