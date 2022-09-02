import React, { useState } from 'react';
import Banner from '../../component/banner/banner';
import Discovery from '../../component/discovery/discovery';
import FindPet from '../../component/find_pet/find_pet';
import Header from '../../component/header/header';
import Homeless, { Animals } from '../../component/homeless/homeless';
import styles from './main.module.css';

const Main = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animals>();
  return (
    <>
      {/* <Header /> */}
      <Banner />
      <Discovery />
      <FindPet />
      <Homeless setSelectedAnimal={setSelectedAnimal} />
    </>
  );
};

export default Main;
