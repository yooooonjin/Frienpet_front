import React from 'react';
import { DiscoveryAnimal } from '../../../page/discovery/DiscoveryPage';
import { Animal } from '../../../page/join/JoinPage';
import styles from './character.module.css';

const Character = ({
  animal,
  weight,
}: {
  animal: Animal | DiscoveryAnimal;
  weight?: boolean;
}) => {
  return (
    <div className={styles.character}>
      {animal.upkind && <div>[ {animal.upkind} ]</div>}
      {animal.kind && <div>{animal.kind}</div>}
      {animal.color && <div>{animal.color}</div>}
      {animal.size && (
        <div>
          {animal.size}
          {weight && 'kg'}
        </div>
      )}
      {animal.gender && <div>{animal.gender === 'F' ? '암컷' : '수컷'}</div>}
    </div>
  );
};

export default Character;
