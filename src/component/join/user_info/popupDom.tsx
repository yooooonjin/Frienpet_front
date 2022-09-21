import React from 'react';
import ReactDom from 'react-dom';

const PopupDom = ({ children }: any) => {
  const el = document.getElementById('PopupDom');
  if (!el) {
    throw new Error(
      "Can't use modal component without root modal continer by id modal"
    );
  }
  return ReactDom.createPortal(children, el);
};

export default PopupDom;
