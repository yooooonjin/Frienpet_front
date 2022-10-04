import React from 'react';
import styles from './button.module.css';

type ButtonProps = {
  msg: string;
  onClick(): void;
  type?: string;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  msg,
  onClick,
  type,
}) => {
  return (
    <div
      className={`${styles.write} ${type && styles.light}`}
      onClick={onClick}
    >
      {msg}
    </div>
  );
};

export default Button;
