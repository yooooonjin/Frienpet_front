import React, { Dispatch, SetStateAction } from 'react';
import styles from './heartAnimalInfo.module.css';
import { HeartAnimal } from '../../apis/homeless';
import DateFormat from '../common/dateFormat/dateFormat';
import Icon from '../common/icon/icon';

const HeartAnimalInfo = ({
  setAnimalInfoPop,
  selectedAnimal,
  onDelete,
}: {
  setAnimalInfoPop: Dispatch<SetStateAction<boolean>>;
  selectedAnimal: HeartAnimal & { beOver: boolean } & { end: boolean };
  onDelete(): void;
}) => {
  return (
    <section>
      <div className={styles.dim}></div>
      <div className={styles.write_popup}>
        <div className={styles.close}>
          <div className={styles.trashIcon} onClick={onDelete}>
            <Icon icon='TrashCan' />
          </div>
          <div
            className={styles.closeIcon}
            onClick={() => setAnimalInfoPop(false)}
          >
            <Icon icon='CircleXmark' />
          </div>
        </div>
        <div className={styles.animalInfo}>
          <div>
            <img src={selectedAnimal.filename} className={styles.photo} />
          </div>
          <div className={styles.animalInfoTxt}>
            <div className={styles.noticeNo}>{selectedAnimal.noticeNo}</div>
            <div className={styles.careNm}>{selectedAnimal.careNm}</div>
            <div className={styles.careTel}>
              <span className={styles.phoneIcon}>
                <Icon icon='Phone' />
              </span>
              {selectedAnimal?.careTel}
            </div>

            <div className={styles.noticeEdt}>
              ~&nbsp;
              <DateFormat date={selectedAnimal.noticeEdt} division='.' />
            </div>
            {selectedAnimal?.beOver && (
              <p className={styles.beOver}>
                <Icon icon='Exclamation' />
                기간이 얼마 남지 않은 공고입니다.
              </p>
            )}
            {selectedAnimal?.end && (
              <p className={styles.beOver}>
                <Icon icon='Exclamation' />
                기간이 지난 공고입니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeartAnimalInfo;
