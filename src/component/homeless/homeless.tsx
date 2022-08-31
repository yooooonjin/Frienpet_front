import React from 'react';
import styles from './homeless.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faDog, faCat } from '@fortawesome/free-solid-svg-icons';

const Homeless = () => {
  return (
    <section className={styles.homeless_container}>
      <div className={styles.homeless}>
        <h2 className={styles.title}>보호중인 유기동물</h2>
        <p className={styles.subTitle}>
          본 정보는 지방자치단체와 유기동물 보호시설에서 등록한 보호중
          동물입니다.
        </p>
        <form className={styles.search_bar}>
          <input className={styles.radio} type='radio' name='kind' id='dog' />
          <label htmlFor='dog' className={styles.animal}>
            <FontAwesomeIcon icon={faDog} className={styles.animalIcon} />
          </label>
          <input className={styles.radio} type='radio' name='kind' id='cat' />
          <label htmlFor='cat' className={styles.animal}>
            <FontAwesomeIcon icon={faCat} className={styles.animalIcon} />
          </label>
          <span>지역 : </span>
          <select name='place' id='place'>
            <option value=''>전체</option>
            <option value=''>서울특별시</option>
            <option value=''>부산광역시</option>
            <option value=''>대구광역시</option>
            <option value=''>인천광역시</option>
            <option value=''>광주광역시</option>
            <option value=''>대전광역시</option>
            <option value=''>울산광역시</option>
            <option value=''>세종특별시</option>
            <option value=''>경기도</option>
            <option value=''>강원도</option>
            <option value=''>충청북도</option>
            <option value=''>충청남도</option>
            <option value=''>전라북도</option>
            <option value=''>전라남도</option>
            <option value=''>경상북도</option>
            <option value=''>경상남도</option>
            <option value=''>제주도</option>
          </select>
          <span>세부 지역 : </span>
          <select name='place' id='place'>
            <option value=''>전체</option>
            <option value=''>강남구</option>
            <option value=''>강동구</option>
            <option value=''>강서구</option>
            <option value=''>관악구</option>
            <option value=''>광진구</option>
            <option value=''>구로구</option>
            <option value=''>금천구</option>
            <option value=''>노원구</option>
            <option value=''>도봉구</option>
            <option value=''>동대문구</option>
            <option value=''>동작구</option>
            <option value=''>마포구</option>
            <option value=''>서대문구</option>
            <option value=''>서초구</option>
            <option value=''>성동구</option>
            <option value=''>성북구</option>
            <option value=''>송파구</option>
            <option value=''>양천구</option>
            <option value=''>영등포구</option>
            <option value=''>용산구</option>
            <option value=''>은평구</option>
            <option value=''>종로구</option>
            <option value=''>중구</option>
            <option value=''>중랑구</option>
          </select>
          <span>상태 : </span>
          <select name='place' id='place'>
            <option value=''>전체</option>
            <option value=''>공고중</option>
            <option value=''>보호중</option>
          </select>
          <span>날짜 : </span>
          <input type='date' placeholder='날짜' />
          <span>~</span>
          <input type='date' placeholder='날짜' />
          <button>찾아보기</button>
        </form>
        <div className={styles.info_container}>
          <div className={styles.info}>
            <img className={styles.info_img} src='images/frienpet(1).jpg' />
            <div className={styles.info_text}>
              <div className={styles.gender}>암컷</div>
              <p className={styles.feature}>
                2019년생 믹스견 8kg__3개월령 얌전한 성격
              </p>

              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                백암길93번길 6 집 앞
              </p>
              <div className={styles.period}>
                2022.08.24 <br />~ 2022.09.05
              </div>
            </div>
          </div>
          {/* //////////////////////////////////////////// */}
          <div className={styles.info}>
            <img className={styles.info_img} src='images/frienpet(1).jpg' />
            <div className={styles.info_text}>
              <div className={styles.gender}>암컷</div>
              <p className={styles.feature}>
                2019년생 믹스견 8kg__3개월령 얌전한 성격
              </p>

              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                우성2차 101동 908호
              </p>
              <div className={styles.period}>
                2022.08.24 <br />~ 2022.09.05
              </div>
            </div>
          </div>
          {/* //////////////////////////////////////////// */}
          <div className={styles.info}>
            <img className={styles.info_img} src='images/frienpet(1).jpg' />
            <div className={styles.info_text}>
              <div className={styles.gender}>암컷</div>
              <p className={styles.feature}>
                2019년생 믹스견 8kg__3개월령 얌전한 성격
              </p>

              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                백암길93번길 6 집 앞
              </p>
              <div className={styles.period}>
                2022.08.24 <br />~ 2022.09.05
              </div>
            </div>
          </div>
          {/* //////////////////////////////////////////// */}
          <div className={styles.info}>
            <img className={styles.info_img} src='images/frienpet(1).jpg' />
            <div className={styles.info_text}>
              <div className={styles.gender}>암컷</div>
              <p className={styles.feature}>
                2019년생 믹스견 8kg__3개월령 얌전한 성격
              </p>

              <p className={styles.location}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={styles.locationIcon}
                />
                백암길93번길 6 집 앞
              </p>
              <div className={styles.period}>
                2022.08.24 <br />~ 2022.09.05
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homeless;
