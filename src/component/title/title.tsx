import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './title.module.css';

const Title = ({
  title,
  subTitle,
  page,
}: {
  title: string;
  subTitle: string;
  page: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={`${page === 'homeless' && styles.homeless}`}>
      <h2
        className={styles.title}
        onClick={() => {
          navigate(`/${page}`);
        }}
      >
        {title}
        <span className={styles.more}>▶</span>
      </h2>

      <p className={styles.subTitle}>{subTitle}</p>
    </div>
  );
};

export default Title;
