import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HeartAnimals from '../../component/heartAnimals/heartAnimals';
import Homeless, { HomelessAnimalT } from '../../component/homeless/homeless';
import HomelessAnimalInfo from '../../component/homeless/homelessAnimalInfo';
import { RootState } from '../../modules';

export interface HomelessAnimalProps {
  // selectedAnimal: Animals | undefined;
  selectedAnimal: HomelessAnimalT;
  email: string;
}
export interface HomelessProps {
  setSelectedAnimal: Dispatch<SetStateAction<HomelessAnimalT | undefined>>;
}

const HomelessPage = () => {
  const location = useLocation();
  const email = useSelector((state: RootState) => state.user.loggedInfo.email);
  const state = location.state as { animal: HomelessAnimalT };
  const animal = state?.animal;
  const [selectedAnimal, setSelectedAnimal] = useState<HomelessAnimalT>();

  useEffect(() => {
    state && setSelectedAnimal(animal);
  }, []);
  return (
    <div>
      <HeartAnimals email={email} />
      {selectedAnimal && (
        <HomelessAnimalInfo selectedAnimal={selectedAnimal} email={email} />
      )}
      <Homeless setSelectedAnimal={setSelectedAnimal} />
    </div>
  );
};

export default HomelessPage;
