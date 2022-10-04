import React from 'react';
import styles from './currentPage.module.css';

interface CurrentPageProps {
  current: boolean;
  title: string;
}

const CurrentPage: React.FunctionComponent<CurrentPageProps> = ({
  current,
  title,
}) => {
  return (
    <div className={styles.nav}>
      <div className={`${styles.circle} ${current && styles.current}`}></div>
      <p className={`${styles.nav_title} ${current && styles.current_title}`}>
        {title}
      </p>
    </div>
  );
};

export default CurrentPage;
