import React, { useState } from 'react';
import Banner from '../../component/banner/banner';
import Discovery from '../../component/discovery/discovery';
import LostPet from '../../component/lost_pet/lost_pet';
import Homeless, { Animals } from '../../component/homeless/homeless';

const Main = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animals>();
  return (
    <>
      <Banner />
      <Discovery />
      <LostPet />
      <Homeless setSelectedAnimal={setSelectedAnimal} />
    </>
  );
};

export default Main;
