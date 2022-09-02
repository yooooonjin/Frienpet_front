import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../component/banner/banner';
import Homeless, { Animals } from '../../component/homeless/homeless';
import HomelessAnimal from '../../component/homeless_animal/homeless_animal';
import styles from './homeless_page.module.css';

export interface HomelessAnimalProps {
  selectedAnimal: Animals | undefined;
}
export interface HomelessProps {
  setSelectedAnimal: Dispatch<SetStateAction<Animals | undefined>>;
}

const HomelessPage = () => {
  const location = useLocation();
  const state = location.state as { animal: Animals };
  const animal = state?.animal;
  const [selectedAnimal, setSelectedAnimal] = useState<Animals>();

  useEffect(() => {
    state && setSelectedAnimal(animal);
  }, []);
  return (
    <>
      <Banner />
      {selectedAnimal && <HomelessAnimal selectedAnimal={selectedAnimal} />}
      <Homeless setSelectedAnimal={setSelectedAnimal} />
    </>
  );
};

export default HomelessPage;
