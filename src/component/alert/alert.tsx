import React, { Dispatch, SetStateAction } from 'react';
import styles from './alert.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

interface AlertProps {
  message: string;
  setError: Dispatch<SetStateAction<boolean>>;
}

const Alert: React.FunctionComponent<AlertProps> = ({ message, setError }) => {
  return (
    <>
      <div className={styles.dim}></div>
      <section className={styles.alert}>
        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
        <div className={styles.message}>
          {message.split('<br/>').map((line, index) => {
            return (
              <span key={index}>
                {line}
                <br />
              </span>
            );
          })}
        </div>
        <button
          className={styles.button}
          onClick={() => {
            setError(false);
          }}
        >
          확인
        </button>
      </section>
    </>
  );
};

export default Alert;
