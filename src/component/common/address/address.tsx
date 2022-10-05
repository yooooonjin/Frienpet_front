import React from 'react';
import { DiscoveryAnimal } from '../../../page/discovery/DiscoveryPage';
import { LostPet } from '../../../page/lostPet/LostPetPage';
import styles from './address.module.css';

const Address = ({ address }: { address: DiscoveryAnimal | LostPet }) => {
  return (
    <div className={styles.address}>
      {address.sido} &gt; {address.sigungu} &gt; {address.bname}
    </div>
  );
};

export default Address;
