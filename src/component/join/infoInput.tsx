import React from 'react';
import styles from './infoInput.module.css';
import Icon from '../common/icon/icon';
import Input from './input';

interface InfoInputProps {
  onValueCheck?(e: React.FocusEvent<HTMLInputElement>): Promise<string>;
  onChange?(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void;
  title: string;
  desc?: string;
  name: string;
}

const InfoInput: React.FunctionComponent<InfoInputProps> = ({
  onValueCheck,
  onChange,
  title,
  desc,
  name,
}) => {
  const onCheck = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onValueCheck) {
      const { parentNode, parentElement, nextElementSibling } = e.target;
      const successCheck = nextElementSibling!.classList;
      const errorCheck = parentElement!.classList;

      onValueCheck(e).then((message) => {
        if (message) {
          successCheck.remove(`${styles.check}`);
          errorCheck.add(`${styles.error}`);
        } else {
          successCheck.add(`${styles.check}`);
          errorCheck.remove(`${styles.error}`);
        }
        parentNode!.nextSibling!.textContent = message;
      });
    }
  };

  return (
    <div className={styles.info_wrap}>
      <p className={styles.info_title}>
        {title}
        <span className={styles.desc}>{desc}</span>
      </p>
      <div className={`${name === 'gender' ? styles.radio : styles.input}`}>
        {onValueCheck && (
          <>
            <Input name={name} onCheck={onCheck} />
            <p className={styles.checkIcon}>
              <Icon icon='CircleCheck' />
            </p>
          </>
        )}
        {onChange &&
          (name === 'gender' ? (
            <>
              <input
                type='radio'
                name='gender'
                id='female'
                value='F'
                className={styles.gender}
                onChange={onChange}
              />
              <label htmlFor='female' className={styles.gender_label}>
                암컷
              </label>
              <input
                type='radio'
                name='gender'
                id='male'
                value='M'
                className={styles.gender}
                onChange={onChange}
              />
              <label htmlFor='male' className={styles.gender_label}>
                수컷
              </label>
            </>
          ) : (
            <Input name={name} onChange={onChange} />
          ))}
      </div>
      {onValueCheck && <p className={styles.errorMsg}></p>}
    </div>
  );
};

export default InfoInput;
