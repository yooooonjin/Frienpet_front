import React from 'react';
import Banner from '../../component/banner/banner';
import Discovery from '../../component/discovery/discovery';
import FindPet from '../../component/find_pet/find_pet';
import Header from '../../component/header/header';
import Homeless from '../../component/homeless/homeless';
import styles from './main.module.css';

const Main = () => {
  return (
    <>
      {/* <Header /> */}
      <Banner />
      <Discovery />
      <FindPet />
      <Homeless />
    </>
  );
};

export default Main;
