import React from 'react';

export interface InputProps {
  name: string;
  onCheck?(e: React.FocusEvent<HTMLInputElement>): void;
  onChange?(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void;
}

const Input: React.FunctionComponent<InputProps> = ({
  name,
  onCheck,
  onChange,
}) => {
  return (
    <>
      {onCheck && (
        <input
          type={name === 'pw' || name === 're_pw' ? 'password' : 'text'}
          name={name}
          onBlur={onCheck}
        />
      )}
      {onChange &&
        (name === 'feature' ? (
          <textarea name={name} onChange={onChange} />
        ) : name === 'upkind' ? (
          <select name='upkind' onChange={onChange}>
            <option value=''>선택</option>
            <option value='개'>개</option>
            <option value='고양이'>고양이</option>
            <option value='기타'>기타</option>
          </select>
        ) : (
          <input
            type={name === 'size' ? 'number' : 'text'}
            name={name}
            onChange={onChange}
          />
        ))}
    </>
  );
};

export default Input;
