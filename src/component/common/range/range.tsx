import React, { SetStateAction } from 'react';
import styles from './range.module.css';

interface RangeProps {
  onRangeChange(range: string): void;
}
const Range: React.FunctionComponent<RangeProps> = ({ onRangeChange }) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRangeChange(e.target.id);
  };
  return (
    <div className={styles.range}>
      <input type='radio' name='range' id='sido' onChange={handleRangeChange} />
      <label htmlFor='sido'>시도</label>
      <input
        type='radio'
        name='range'
        id='sigungu'
        onChange={handleRangeChange}
        defaultChecked
      />
      <label htmlFor='sigungu'>시군구</label>
      <input
        type='radio'
        name='range'
        id='bname'
        onChange={handleRangeChange}
      />
      <label htmlFor='bname'>동네</label>
    </div>
  );
};

export default Range;
