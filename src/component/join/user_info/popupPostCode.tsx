import React, { Dispatch, SetStateAction } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './popupPostCode.module.css';

interface PopupPostCodeProps {
  onPopupControl: Dispatch<SetStateAction<boolean>>;
  onSetAddress(value: string | any, name?: string): void;
}

const PopupPostCode: React.FunctionComponent<PopupPostCodeProps> = ({
  onPopupControl,
  onSetAddress,
}) => {
  const handlePostCode = (data: any) => {
    const address = {
      sido: data.sido,
      sigungu: data.sigungu,
      bname: data.bname,
    };
    onSetAddress(address);
    onPopupControl(false);
  };

  const postCodeStyle = {
    display: 'block',
    top: '120px',
    height: '450px',
  };
  return (
    <div className={styles.postCodePopup}>
      <DaumPostcode
        style={postCodeStyle}
        className={styles.postCodeStyle}
        onComplete={handlePostCode}
      />
      <div
        onClick={() => {
          onPopupControl(false);
        }}
        className={styles.postCodeBtn}
      >
        닫기
      </div>
    </div>
  );
};

export default PopupPostCode;
