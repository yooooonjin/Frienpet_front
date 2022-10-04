import React, { useState } from 'react';
import Banner from '../../component/banner/banner';
import Discovery from '../../component/discovery/discovery';
import Homeless, { HomelessAnimalT } from '../../component/homeless/homeless';
import LostAnimals from '../../component/lostAnimals/lostAnimals';

const Main = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<HomelessAnimalT>();
  return (
    <>
      <Banner />
      <Discovery />
      <LostAnimals />
      <Homeless setSelectedAnimal={setSelectedAnimal} />
    </>
  );
};

export default Main;
