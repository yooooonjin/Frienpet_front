import React, { FunctionComponent, useState } from 'react';
import styles from './animals.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { AnimalProps } from './homeless';
import { useLocation, useNavigate } from 'react-router-dom';

const Animals: FunctionComponent<AnimalProps> = ({
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
        <p className={styles.feature}>
          {animal.age}__{animal.kindCd}__{animal.weight}
        </p>
        <p className={styles.location}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={styles.locationIcon}
          />
          {animal.happenPlace}
        </p>
        <div className={styles.period}>
          {animal.noticeSdt.slice(0, 4) +
            '.' +
            animal.noticeSdt.slice(4, 6) +
            '.' +
            animal.noticeSdt.slice(6, 8)}
          <br />~
          {animal.noticeEdt.slice(0, 4) +
            '.' +
            animal.noticeEdt.slice(4, 6) +
            '.' +
            animal.noticeEdt.slice(6, 8)}
        </div>
      </div>
    </div>
  );
};

export default Animals;
