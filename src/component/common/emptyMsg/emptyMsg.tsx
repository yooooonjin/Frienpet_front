import React from 'react';
import styles from './emptyMsg.module.css';

const EmptyMsg = () => {
  return <div className={styles.emptyMsg}>게시글이 존재하지 않습니다.</div>;
};

export default EmptyMsg;
