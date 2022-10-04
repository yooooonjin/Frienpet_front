import React, { Dispatch, SetStateAction } from 'react';
import styles from './alert.module.css';
import Icon from '../icon/icon';

interface AlertProps {
  message: string;
  setError?: Dispatch<SetStateAction<boolean>>;
  setErrorMsg?: Dispatch<SetStateAction<{ status: boolean; msg: string }>>;
}

const Alert: React.FunctionComponent<AlertProps> = ({
  message,
  setError,
  setErrorMsg,
}) => {
  const onClick = () => {
    setError && setError(false);
    setErrorMsg && setErrorMsg({ status: false, msg: '' });
  };

  return (
    <>
      <div className={styles.dim}></div>
      <section className={styles.alert}>
        <p className={styles.icon}>
          <Icon icon='Exclamation' />
        </p>
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
        <button className={styles.button} onClick={onClick}>
          확인
        </button>
      </section>
    </>
  );
};

export default Alert;
